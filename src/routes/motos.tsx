import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, Wrench } from "lucide-react";
import salonMotos from "@/assets/salon-motos-2.jpg";
import { BUSINESS, waLink } from "@/lib/business";
import { byLine } from "@/lib/catalog";
import { Catalog } from "@/components/site/Catalog";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/motos")({
  head: () => ({
    meta: [
      { title: "Motos 0 km en Venado Tuerto · Zoesa Motos" },
      {
        name: "description",
        content: "Scooters, cub, motos de calle y enduro. Honda, Yamaha, Suzuki, Gilera, Corven y más. Consultá precio y financiación.",
      },
      { property: "og:title", content: "Motos 0 km en Venado Tuerto · Zoesa Motos" },
      { property: "og:description", content: "Elegí tu próxima moto y consultá precio, stock y financiación por WhatsApp." },
    ],
  }),
  component: MotosPage,
});

function MotosPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo de motos"
        title="Elegí tu"
        accent="próxima moto"
        description="Scooters, cub, calle y enduro de las mejores marcas. Consultá precio, stock y planes de financiación."
        image={salonMotos}
      >
        <div className="flex flex-wrap gap-2">
          {BUSINESS.brands.map((b) => (
            <span key={b} className="rounded-full border border-ink-border bg-ink-foreground/10 px-3 py-1 text-sm font-semibold backdrop-blur">
              {b}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <Catalog products={byLine("motos")} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-ink p-8 text-ink-foreground md:p-10">
            <Wrench className="h-10 w-10 text-primary" />
            <h2 className="mt-5 text-4xl font-extrabold uppercase italic">Servicio mecánico</h2>
            <p className="mt-2 text-ink-muted">Service, reparaciones y puesta a punto en nuestro taller.</p>
            <Link
              to="/taller"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Pedir turno <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-10">
            <Package className="h-10 w-10" />
            <h2 className="mt-5 text-4xl font-extrabold uppercase italic">¿Buscás un repuesto?</h2>
            <p className="mt-2 font-medium">Tenemos repuestos nuevos y usados. Decinos marca, modelo y qué necesitás.</p>
            <a
              href={waLink("¡Hola Zoesa! Busco un repuesto para mi moto. Marca/modelo: ___ · Repuesto: ___")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 font-bold text-primary transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-4 w-4" /> Consultar repuesto
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
