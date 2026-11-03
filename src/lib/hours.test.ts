import { describe, expect, it } from "vitest";
import { openStatus } from "./hours";

// Argentina is UTC-3 (no DST). Build instants from AR local time.
const ar = (iso: string) => new Date(`${iso}-03:00`);

describe("store hours", () => {
  it("is open on a weekday morning (Tue 9:30)", () => {
    expect(openStatus(ar("2026-11-03T09:30:00")).open).toBe(true);
  });

  it("is closed at weekday siesta (Tue 13:00) and reopens at 16", () => {
    const s = openStatus(ar("2026-11-03T13:00:00"));
    expect(s.open).toBe(false);
    expect(s.label).toContain("abre hoy a las 16");
  });

  it("closes weekdays at 20 hs", () => {
    expect(openStatus(ar("2026-11-03T19:59:00")).open).toBe(true);
    expect(openStatus(ar("2026-11-03T20:00:00")).open).toBe(false);
  });

  it("is open Saturday until 13 hs only", () => {
    expect(openStatus(ar("2026-11-07T12:30:00")).open).toBe(true);
    expect(openStatus(ar("2026-11-07T13:00:00")).open).toBe(false);
    expect(openStatus(ar("2026-11-07T17:00:00")).open).toBe(false);
  });

  it("is closed on Sunday and opens Monday at 8", () => {
    const s = openStatus(ar("2026-11-08T10:00:00"));
    expect(s.open).toBe(false);
    expect(s.label).toContain("mañana a las 8");
  });
});
