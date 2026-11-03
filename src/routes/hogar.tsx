import { createFileRoute } from "@tanstack/react-router";
import { Armchair, Truck, ShieldCheck } from "lucide-react";
import salonHogar from "@/assets/salon-hogar.jpg";
import { waLink } from "@/lib/business";
import { byLine } from "@/lib/catalog";
import { Catalog } from "@/components/site/Catalog";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/hogar")({
  head: () => ({
    meta: [
      { title: "Electrodomésticos y hogar en Venado Tuerto · Zoesa" },
      {
        name: "description",
        content: "Heladeras, lavarropas, Smart TV, aires acondicionados, cocinas, muebles y más. Consultá precio y cuotas.",
      },
      { property: "og:title", content: "Electrodomésticos y hogar en Venado Tuerto · Zoesa" },
      { property: "og:description", content: "Todo para equipar tu casa con atención personalizada y precio justo." },
    ],
  }),
  component: HogarPage,
});

const PERKS = [
  { icon: ShieldCheck, title: "Marcas confiables", text: "Productos con garantía oficial." },
  { icon: Armchair, title: "También muebles", text: "Comedores, sillas, alacenas y bazar." },
  { icon: Truck, title: "Consultá la entrega", text: "Coordinamos cómo llevarlo a tu casa." },
];

function HogarPage() {
  return (
    <>
      <PageHero
        eyebrow="Electrodomésticos y hogar"
        title="Equipá tu"
        accent="casa"
        description="Heladeras, lavado, tecnología, climatización, cocina, muebles y bazar. Todo en un mismo lugar."
        image={salonHogar}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <Catalog products={byLine("hogar")} />
      </section>

      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-6">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 -skew-x-6 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <p.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-2xl font-bold uppercase italic">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-ink-foreground md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-4xl font-extrabold uppercase italic">¿No ves lo que buscás?</h2>
              <p className="mt-1 text-ink-muted">Tenemos mucho más en el local. Preguntanos.</p>
            </div>
            <a
              href={waLink("¡Hola Zoesa! Estoy buscando un electrodoméstico: ___")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-whatsapp-foreground transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" /> Preguntar ahora
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
