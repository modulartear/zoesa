/**
 * Store hours (Argentina time):
 * Lunes a viernes 8–12 y 16–20 · Sábados 8–13 · Domingos cerrado.
 */
type Range = [number, number]; // minutes from midnight [open, close)

export const SCHEDULE: Record<number, Range[]> = {
  0: [],
  1: [[480, 720], [960, 1200]],
  2: [[480, 720], [960, 1200]],
  3: [[480, 720], [960, 1200]],
  4: [[480, 720], [960, 1200]],
  5: [[480, 720], [960, 1200]],
  6: [[480, 780]],
};

export const SCHEDULE_TEXT = [
  { days: "Lunes a viernes", hours: "8 a 12 hs · 16 a 20 hs" },
  { days: "Sábados", hours: "8 a 13 hs" },
  { days: "Domingos", hours: "Cerrado" },
];

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

/** Day of week + minutes since midnight in Argentina for a given instant. */
export function argentinaClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { day, minutes };
}

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm ? `${h}:${String(mm).padStart(2, "0")}` : `${h}`;
};

export function openStatus(date: Date): { open: boolean; label: string } {
  const { day, minutes } = argentinaClock(date);
  const today = SCHEDULE[day];
  const current = today.find(([o, c]) => minutes >= o && minutes < c);
  if (current) return { open: true, label: `Abierto ahora · cierra a las ${fmt(current[1])} hs` };

  const laterToday = today.find(([o]) => o > minutes);
  if (laterToday) return { open: false, label: `Cerrado · abre hoy a las ${fmt(laterToday[0])} hs` };

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const first = SCHEDULE[d][0];
    if (first) {
      const when = i === 1 ? "mañana" : `el ${DAY_NAMES[d]}`;
      return { open: false, label: `Cerrado · abre ${when} a las ${fmt(first[0])} hs` };
    }
  }
  return { open: false, label: "Cerrado" };
}
