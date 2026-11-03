import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, HeartHandshake, Scale } from "lucide-react";
import frente from "@/assets/local-frente.jpg";
import lateral from "@/assets/local-lateral.jpg";
import salonMotos from "@/assets/salon-motos.jpg";
import salonMotos2 from "@/assets/salon-motos-2.jpg";
import salonHogar from "@/assets/salon-hogar.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros · Zoesa, más de 20 años en Venado Tuerto" },
      {
        name: "description",
        content: "Conocé Zoesa Motos y Electrodomésticos: más de 20 años acompañando a las familias de Venado Tuerto.",
      },
      { property: "og:title", content: "Nosotros · Zoesa, más de 20 años en Venado Tuerto" },
      { property: "og:description", content: "Atención personalizada, asesoramiento claro y precio justo desde hace más de 20 años." },
    ],
  }),
  component: NosotrosPage,
});

const VALUES = [
  { icon: HeartHandshake, title: "Atención personalizada", text: "Te escuchamos y te recomendamos lo que de verdad te sirve." },
  { icon: BadgeCheck, title: "Calidad", text: "Motos y electrodomésticos confiables para el uso diario." },
  { icon: Scale, title: "Precio justo", text: "Propuestas claras, sin letra chica." },
];

const GALLERY = [
  { src: frente, alt: "Frente del local", cls: "md:col-span-2 md:row-span-2", w: 1599, h: 899 },
  { src: salonMotos, alt: "Salón de motos", cls: "", w: 1200, h: 1600 },
  { src: salonHogar, alt: "Salón de hogar y muebles", cls: "", w: 1200, h: 1600 },
  { src: salonMotos2, alt: "Motos 0 km en exhibición", cls: "", w: 1200, h: 1600 },
  { src: lateral, alt: "Motos frente al local", cls: "", w: 1599, h: 899 },
];

function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestra historia"
        title="Más de 20 años"
        accent="en Venado Tuerto"
        description="Un comercio familiar que acompaña a las familias de la ciudad con motos, taller, repuestos y todo para el hogar."
        image={lateral}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-5xl font-extrabold uppercase italic md:text-6xl">
            De vecino <span className="text-signal">a vecino</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-muted-foreground">
          <p>
            En <strong className="text-foreground">Zoesa Motos y Electrodomésticos</strong> contamos con más de
            20 años de experiencia acompañando a las familias de Venado Tuerto, ofreciendo electrodomésticos
            y motos confiables para el uso diario.
          </p>
          <p>
            Nos caracteriza la atención personalizada, el asesoramiento claro y una propuesta pensada para
            quienes buscan calidad, precio justo y un comercio de confianza.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1} className="rounded-3xl border border-ink-border p-8">
              <v.icon className="h-10 w-10 text-primary" />
              <h3 className="mt-5 text-3xl font-bold uppercase italic">{v.title}</h3>
              <p className="mt-2 text-ink-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <Reveal>
          <h2 className="text-5xl font-extrabold uppercase italic md:text-6xl">Pasá a conocernos</h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.alt} delay={i * 0.06} className={`group overflow-hidden rounded-3xl ${g.cls}`}>
              <img
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Cómo llegar <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
