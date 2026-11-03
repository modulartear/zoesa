import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import frente from "@/assets/local-frente.jpg";
import { BUSINESS, mapsEmbed, mapsLink, waLink } from "@/lib/business";
import { SCHEDULE_TEXT } from "@/lib/hours";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { OpenStatus } from "@/components/site/OpenStatus";
import { FacebookIcon, WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Zoesa Motos y Electrodomésticos" },
      {
        name: "description",
        content: "Lavalle 2729, Venado Tuerto. WhatsApp (03462) 15 627084 / 15 509775. Lunes a viernes 8–12 y 16–20, sábados 8–13.",
      },
      { property: "og:title", content: "Contacto · Zoesa Motos y Electrodomésticos" },
      { property: "og:description", content: "Escribinos por WhatsApp o visitanos en Lavalle 2729, Venado Tuerto." },
    ],
  }),
  component: ContactoPage,
});

const TOPICS = ["Motos", "Electrodomésticos", "Taller", "Repuestos", "Financiación", "Otro"];
const field =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring";

function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState(TOPICS[0]);
  const [mensaje, setMensaje] = useState("");
  const [linea, setLinea] = useState(0);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mensaje.trim().length < 3) {
      setError("Escribí tu consulta");
      return;
    }
    setError("");
    const msg = `¡Hola Zoesa!${nombre.trim() ? ` Soy ${nombre.trim()}.` : ""}\nConsulta sobre: ${tema}\n${mensaje.trim()}`;
    window.open(waLink(msg, linea), "_blank", "noopener,noreferrer");
    toast.success("Abrimos WhatsApp con tu consulta lista para enviar.");
  };

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Estamos"
        accent="cerca"
        description="Escribinos por WhatsApp, llamanos o pasá por el local. Te atendemos personalmente."
        image={frente}
      >
        <span className="inline-flex rounded-full bg-ink-foreground/10 px-4 py-2 backdrop-blur">
          <OpenStatus className="text-ink-foreground" />
        </span>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 md:px-6 lg:grid-cols-3">
        <Reveal className="rounded-[2rem] border border-border bg-card p-8">
          <MapPin className="h-8 w-8 text-signal" />
          <h2 className="mt-4 text-3xl font-bold uppercase italic">Dirección</h2>
          <p className="mt-2 text-muted-foreground">
            {BUSINESS.address}
            <br />
            {BUSINESS.city}
          </p>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 font-bold hover:text-signal">
            Abrir en Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[2rem] border border-border bg-card p-8">
          <Phone className="h-8 w-8 text-signal" />
          <h2 className="mt-4 text-3xl font-bold uppercase italic">Teléfono / WhatsApp</h2>
          <ul className="mt-3 space-y-3">
            {BUSINESS.phones.map((p, i) => (
              <li key={p.tel} className="flex items-center justify-between gap-3">
                <a href={`tel:${p.tel}`} className="font-semibold hover:text-signal">{p.display}</a>
                <a
                  href={waLink("¡Hola Zoesa! Quiero hacer una consulta.", i)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${p.display}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground transition-transform hover:scale-110"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.16} className="rounded-[2rem] bg-ink p-8 text-ink-foreground">
          <Clock className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-3xl font-bold uppercase italic">Horarios</h2>
          <ul className="mt-3 space-y-2">
            {SCHEDULE_TEXT.map((s) => (
              <li key={s.days} className="flex justify-between gap-4 border-b border-ink-border pb-2 text-sm">
                <span className="font-semibold">{s.days}</span>
                <span className="text-right text-ink-muted">{s.hours}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 md:px-6 lg:grid-cols-2">
        <Reveal>
          <form onSubmit={submit} noValidate className="h-full space-y-4 rounded-[2rem] border border-border bg-card p-6 shadow-pop md:p-8">
            <h2 className="text-4xl font-extrabold uppercase italic">Escribinos</h2>
            <p className="text-sm text-muted-foreground">Completá y se abre WhatsApp con tu mensaje listo.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nombre" className="mb-1.5 block text-sm font-semibold">Nombre</label>
                <input id="c-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={field} placeholder="Tu nombre" maxLength={60} />
              </div>
              <div>
                <label htmlFor="c-linea" className="mb-1.5 block text-sm font-semibold">Enviar a</label>
                <select id="c-linea" value={linea} onChange={(e) => setLinea(Number(e.target.value))} className={field}>
                  {BUSINESS.phones.map((p, i) => (
                    <option key={p.wa} value={i}>{p.display}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">¿Sobre qué querés consultar?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTema(t)}
                    aria-pressed={tema === t}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      tema === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="c-mensaje" className="mb-1.5 block text-sm font-semibold">Mensaje</label>
              <textarea
                id="c-mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={5}
                maxLength={800}
                placeholder="Contanos qué necesitás"
                className="w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
              />
              {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Enviar por WhatsApp
            </button>
            <div className="flex flex-wrap gap-2 pt-2">
              <a href={BUSINESS.facebookHogar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-semibold hover:bg-accent">
                <FacebookIcon className="h-4 w-4" /> Zoesa Hogar
              </a>
              <a href={BUSINESS.facebookMotos} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-semibold hover:bg-accent">
                <FacebookIcon className="h-4 w-4" /> Zoesa Motos
              </a>
            </div>
          </form>
        </Reveal>
        <Reveal delay={0.1} className="min-h-96 overflow-hidden rounded-[2rem] border border-border">
          <iframe
            title="Mapa: Zoesa en Lavalle 2729, Venado Tuerto"
            src={mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-96 w-full"
          />
        </Reveal>
      </section>
    </>
  );
}
