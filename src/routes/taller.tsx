import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Cog, Disc3, Droplets, Gauge, Zap } from "lucide-react";
import { toast } from "sonner";
import taller from "@/assets/taller.jpg";
import { waLink } from "@/lib/business";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/taller")({
  head: () => ({
    meta: [
      { title: "Taller y servicio mecánico de motos · Zoesa Venado Tuerto" },
      {
        name: "description",
        content: "Service, cambio de aceite, frenos, transmisión y electricidad para tu moto. Pedí tu turno online por WhatsApp.",
      },
      { property: "og:title", content: "Taller y servicio mecánico de motos · Zoesa" },
      { property: "og:description", content: "Pedí tu turno de taller en segundos y te confirmamos por WhatsApp." },
    ],
  }),
  component: TallerPage,
});

const SERVICES = [
  { icon: Droplets, title: "Service y aceite" },
  { icon: Disc3, title: "Frenos" },
  { icon: Cog, title: "Transmisión" },
  { icon: Zap, title: "Electricidad" },
  { icon: Gauge, title: "Puesta a punto" },
];

const OPTIONS = ["Service general", "Cambio de aceite", "Frenos", "Kit de transmisión", "Electricidad", "Diagnóstico / otro"];

const field =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring";

function TallerPage() {
  const [form, setForm] = useState({ nombre: "", moto: "", servicio: OPTIONS[0], dia: "", detalle: "" });
  const [errors, setErrors] = useState<{ nombre?: string; moto?: string }>({});
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: { nombre?: string; moto?: string } = {};
    if (form.nombre.trim().length < 2) errs.nombre = "Contanos tu nombre";
    if (form.moto.trim().length < 2) errs.moto = "Indicá marca y modelo";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const msg = [
      "¡Hola Zoesa! Quiero pedir un turno para el taller 🔧",
      `• Nombre: ${form.nombre.trim()}`,
      `• Moto: ${form.moto.trim()}`,
      `• Servicio: ${form.servicio}`,
      form.dia && `• Día preferido: ${form.dia.split("-").reverse().join("/")}`,
      form.detalle.trim() && `• Detalle: ${form.detalle.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    toast.success("Abrimos WhatsApp con tu pedido de turno. ¡Solo tocá enviar!");
  };

  return (
    <>
      <PageHero
        eyebrow="Servicio mecánico"
        title="Tu moto en"
        accent="buenas manos"
        description="Taller propio con repuestos nuevos y usados. Pedí tu turno en segundos y te confirmamos por WhatsApp."
        image={taller}
      />

      <section className="-mt-10 relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="rounded-2xl border border-border bg-card p-5 shadow-pop">
              <s.icon className="h-7 w-7 text-signal" />
              <p className="mt-3 font-display text-xl font-bold uppercase italic">{s.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-signal">Turnos online</p>
          <h2 className="mt-3 text-5xl font-extrabold uppercase italic md:text-6xl">Pedí tu turno</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Completá los datos y se abre WhatsApp con el mensaje listo. Te confirmamos día y horario.
          </p>
          <ul className="mt-8 space-y-3">
            {["Sin llamadas ni esperas", "Te avisamos cuando está lista", "Presupuesto antes de reparar"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="h-5 w-5 text-whatsapp" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="space-y-4 rounded-[2rem] border border-border bg-card p-6 shadow-pop md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="t-nombre" className="mb-1.5 block text-sm font-semibold">Nombre</label>
                <input id="t-nombre" value={form.nombre} onChange={set("nombre")} className={field} placeholder="Tu nombre" maxLength={60} />
                {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="t-moto" className="mb-1.5 block text-sm font-semibold">Moto</label>
                <input id="t-moto" value={form.moto} onChange={set("moto")} className={field} placeholder="Ej: Honda Wave 110" maxLength={60} />
                {errors.moto && <p className="mt-1 text-xs text-destructive">{errors.moto}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="t-servicio" className="mb-1.5 block text-sm font-semibold">Servicio</label>
                <select id="t-servicio" value={form.servicio} onChange={set("servicio")} className={field}>
                  {OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="t-dia" className="mb-1.5 block text-sm font-semibold">Día preferido</label>
                <input id="t-dia" type="date" value={form.dia} onChange={set("dia")} className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="t-detalle" className="mb-1.5 block text-sm font-semibold">¿Qué le pasa? (opcional)</label>
              <textarea
                id="t-detalle"
                value={form.detalle}
                onChange={set("detalle")}
                rows={4}
                maxLength={500}
                className="w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                placeholder="Ej: hace ruido al frenar"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Enviar pedido de turno
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
