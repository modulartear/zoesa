import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { BUSINESS, mapsLink, waLink } from "@/lib/business";
import { SCHEDULE_TEXT } from "@/lib/hours";
import { Logo } from "./Logo";
import { NAV } from "./Header";
import { FacebookIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 speed-lines" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-6">
        <p className="font-display text-[18vw] leading-none font-extrabold uppercase italic text-outline text-ink-border md:text-[11rem]">
          Zoesa
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo inverted />
            <p className="text-sm text-ink-muted">
              Más de 20 años acompañando a las familias de Venado Tuerto con motos y electrodomésticos
              confiables.
            </p>
            <div className="flex gap-2">
              <a
                href={BUSINESS.facebookHogar}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Zoesa Hogar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={BUSINESS.facebookMotos}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Zoesa Motos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={waLink("¡Hola Zoesa!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border transition-colors hover:bg-whatsapp hover:text-whatsapp-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold uppercase italic text-primary">Secciones</h3>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-ink-muted transition-colors hover:text-ink-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold uppercase italic text-primary">Contacto</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-ink-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {BUSINESS.address}, {BUSINESS.city}
                </a>
              </li>
              {BUSINESS.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex gap-2 hover:text-ink-foreground">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" /> {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold uppercase italic text-primary">Horarios</h3>
            <ul className="space-y-3 text-sm">
              {SCHEDULE_TEXT.map((s) => (
                <li key={s.days} className="flex gap-2 text-ink-muted">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="block font-semibold text-ink-foreground">{s.days}</span>
                    {s.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink-border pt-6 text-xs text-ink-muted md:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Venado Tuerto, Santa Fe.</p>
          <p>Venta · Servicio mecánico · Repuestos nuevos y usados</p>
        </div>
      </div>
    </footer>
  );
}
