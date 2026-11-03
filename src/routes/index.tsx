import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  CreditCard,
  Handshake,
  MapPin,
  Package,
  Refrigerator,
  Wrench,
} from "lucide-react";
import frente from "@/assets/local-frente.jpg";
import lateral from "@/assets/local-lateral.jpg";
import salonMotos from "@/assets/salon-motos.jpg";
import salonHogar from "@/assets/salon-hogar.jpg";
import { BUSINESS, mapsEmbed, mapsLink, waLink } from "@/lib/business";
import { PRODUCTS } from "@/lib/catalog";
import { Reveal } from "@/components/site/Reveal";
import { OpenStatus } from "@/components/site/OpenStatus";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zoesa Motos y Electrodomésticos · Venado Tuerto" },
      {
        name: "description",
        content:
          "Venta de motos, servicio mecánico, repuestos y electrodomésticos en Lavalle 2729, Venado Tuerto. Consultá por WhatsApp.",
      },
      { property: "og:title", content: "Zoesa Motos y Electrodomésticos · Venado Tuerto" },
      {
        property: "og:description",
        content: "Motos, taller, repuestos y electrodomésticos con más de 20 años de confianza en Venado Tuerto.",
      },
    ],
  }),
  component: Index,
});

const SERVICES = [
  { icon: Bike, title: "Venta de motos", text: "Scooters, cub, calle y enduro de las mejores marcas." },
  { icon: Wrench, title: "Servicio mecánico", text: "Taller propio para service, reparaciones y puesta a punto." },
  { icon: Package, title: "Repuestos", text: "Repuestos nuevos y usados. Si no lo tenemos, lo conseguimos." },
  { icon: Refrigerator, title: "Electrodomésticos", text: "Heladeras, lavarropas, TV, aires, cocinas y más para tu casa." },
  { icon: CreditCard, title: "Financiación", text: "Consultanos por las formas de pago y planes vigentes." },
  { icon: Handshake, title: "Atención personal", text: "Asesoramiento claro, de vecino a vecino, sin vueltas." },
];

const STEPS = [
  { n: "01", title: "Elegí", text: "Mirá el catálogo y sumá lo que te guste a tu consulta." },
  { n: "02", title: "Consultá", text: "Envianos la lista por WhatsApp. Te pasamos precio, stock y cuotas." },
  { n: "03", title: "Llevalo", text: "Pasá por el local en Lavalle 2729 y salí andando." },
];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = PRODUCTS.filter((p) => p.badge);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative isolate -mt-16 min-h-[100svh] overflow-hidden bg-ink text-ink-foreground md:-mt-29">
        <motion.img
          src={frente}
          alt="Frente del local de Zoesa Motos en Lavalle 2729, Venado Tuerto"
          width={1599}
          height={899}
          style={{ y: imgY }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="absolute inset-0 -z-10 speed-lines" />

        <motion.div
          style={{ y: textY, opacity: fade }}
          className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-28 pb-16 md:px-6 md:pt-36"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex w-fit -skew-x-12 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            +20 años en Venado Tuerto
          </motion.span>

          <h1 className="mt-6 text-[17vw] font-extrabold uppercase italic leading-[0.85] sm:text-8xl lg:text-[9.5rem]">
            {["Tu moto.", "Tu casa."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={i === 1 ? "block text-primary" : "block"}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-outline text-ink-foreground"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Un lugar.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-lg text-lg text-ink-muted"
          >
            Venta de motos, servicio mecánico, repuestos y electrodomésticos. Atención personalizada,
            precio justo y la confianza de siempre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/motos"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Ver motos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/hogar"
              className="group inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-foreground/10 px-7 py-4 font-bold text-ink-foreground backdrop-blur transition-all hover:bg-ink-foreground hover:text-ink"
            >
              Electrodomésticos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted"
          >
            <OpenStatus className="text-ink-foreground" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> {BUSINESS.address}, {BUSINESS.city}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* BRANDS MARQUEE */}
      <section aria-label="Marcas" className="relative z-10 -mt-6 -rotate-1 bg-primary py-4 text-primary-foreground">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...BUSINESS.brands, ...BUSINESS.brands, ...BUSINESS.brands, ...BUSINESS.brands].map((b, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-3xl font-extrabold uppercase italic md:text-4xl">
                {b} <span className="h-2 w-2 rotate-45 bg-primary-foreground" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TWO WORLDS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-signal">Dos rubros, un solo lugar</p>
          <h2 className="mt-3 text-5xl font-extrabold uppercase italic md:text-7xl">¿Qué estás buscando hoy?</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { to: "/motos" as const, img: salonMotos, title: "Motos", text: "0 km, taller y repuestos", dark: true },
            { to: "/hogar" as const, img: salonHogar, title: "Hogar", text: "Electrodomésticos y muebles", dark: false },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 0.12}>
              <Link
                to={c.to}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/6]"
              >
                <img
                  src={c.img}
                  alt={`Salón de ${c.title.toLowerCase()} de Zoesa`}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-ink-foreground md:p-10">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{c.text}</p>
                    <h3 className="mt-2 text-7xl font-extrabold uppercase italic md:text-8xl">{c.title}</h3>
                  </div>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-7 w-7" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES (dark band) */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 speed-lines" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl text-5xl font-extrabold uppercase italic md:text-7xl">
              Todo lo que <span className="text-primary">necesitás</span>
            </h2>
            <p className="max-w-sm text-ink-muted">
              Venta, taller y repuestos para tu moto. Y todo para equipar tu casa, con asesoramiento real.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="group bg-ink p-8 transition-colors hover:bg-ink-foreground/5">
                <s.icon className="h-10 w-10 text-primary transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                <h3 className="mt-6 text-3xl font-bold uppercase italic">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-signal">Destacados</p>
            <h2 className="mt-3 text-5xl font-extrabold uppercase italic md:text-7xl">Lo más buscado</h2>
          </div>
          <Link to="/motos" className="group inline-flex items-center gap-2 font-bold">
            Ver todo el catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-muted md:grid-cols-2">
          <Reveal className="p-8 md:p-14">
            <p className="font-display text-[9rem] leading-none font-extrabold italic text-primary md:text-[12rem]">+20</p>
            <h2 className="-mt-4 text-4xl font-extrabold uppercase italic md:text-5xl">años de confianza</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Acompañamos a las familias de Venado Tuerto con motos y electrodomésticos confiables para
              el uso diario. Nos caracteriza la atención personalizada, el asesoramiento claro y el precio
              justo.
            </p>
            <Link
              to="/nosotros"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-bold text-background transition-transform hover:scale-105"
            >
              Conocenos <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="h-full">
            <img
              src={lateral}
              alt="Motos en exhibición frente al local de Zoesa"
              width={1599}
              height={899}
              loading="lazy"
              className="h-full min-h-80 w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-signal">Así de fácil</p>
            <h2 className="mt-3 text-5xl font-extrabold uppercase italic md:text-7xl">En 3 pasos</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12} className="relative">
                <span className="font-display text-8xl font-extrabold italic text-outline text-primary">{s.n}</span>
                <h3 className="mt-2 text-4xl font-bold uppercase italic">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + MAP */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-12 lg:col-span-3">
            <h2 className="text-5xl font-extrabold uppercase italic md:text-7xl">¿Hablamos?</h2>
            <p className="mt-4 max-w-md text-lg font-medium">
              Escribinos y te respondemos con precio, stock y formas de pago. Sin compromiso.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {BUSINESS.phones.map((p, i) => (
                <a
                  key={p.wa}
                  href={waLink("¡Hola Zoesa! Quiero hacer una consulta.", i)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3.5 font-bold text-primary transition-transform hover:scale-105"
                >
                  <WhatsAppIcon className="h-5 w-5" /> {p.display}
                </a>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-10 -bottom-16 font-display text-[14rem] leading-none font-extrabold italic text-outline opacity-20">
              Z
            </div>
          </Reveal>
          <Reveal delay={0.12} className="overflow-hidden rounded-[2rem] border border-border lg:col-span-2">
            <iframe
              title="Mapa: Zoesa en Lavalle 2729, Venado Tuerto"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full lg:h-[calc(100%-4rem)]"
            />
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 items-center justify-between bg-card px-6 font-semibold hover:bg-muted"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-signal" /> Cómo llegar
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
