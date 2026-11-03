import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ClipboardList, Menu, Phone } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, waLink } from "@/lib/business";
import { useQuote } from "@/lib/quote-list";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { OpenStatus } from "./OpenStatus";
import { WhatsAppIcon } from "./icons";

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/motos", label: "Motos" },
  { to: "/hogar", label: "Hogar" },
  { to: "/taller", label: "Taller" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { items, setOpen } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
          <OpenStatus className="text-xs text-ink-foreground" />
          <div className="flex items-center gap-5 text-ink-muted">
            <span>
              {BUSINESS.address} · {BUSINESS.city}
            </span>
            <a href={`tel:${BUSINESS.phones[0].tel}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Phone className="h-3 w-3" /> {BUSINESS.phones[0].display}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/85 shadow-pop backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-foreground data-[status=active]:text-background"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Mi consulta, ${items.length} productos`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:scale-105 hover:border-primary"
            >
              <ClipboardList className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1 text-[11px] font-bold text-signal-foreground">
                  {items.length}
                </span>
              )}
            </button>
            <a
              href={waLink("¡Hola Zoesa! Quiero hacer una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-105 sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full border-none bg-ink p-0 text-ink-foreground sm:max-w-sm">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <div className="flex h-full flex-col p-6 speed-lines">
                  <Logo inverted />
                  <nav className="mt-10 flex flex-col" aria-label="Menú móvil">
                    {NAV.map((item, i) => (
                      <SheetClose asChild key={item.to}>
                        <Link
                          to={item.to}
                          activeOptions={{ exact: item.to === "/" }}
                          className="group flex items-center justify-between border-b border-ink-border py-4 font-display text-4xl font-extrabold uppercase italic text-ink-foreground transition-colors data-[status=active]:text-primary"
                        >
                          {item.label}
                          <span className="text-sm font-sans not-italic text-ink-muted">0{i + 1}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-3 pt-8">
                    <OpenStatus className="text-ink-foreground" />
                    <a
                      href={waLink("¡Hola Zoesa! Quiero hacer una consulta.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-whatsapp-foreground"
                    >
                      <WhatsAppIcon className="h-5 w-5" /> Escribinos por WhatsApp
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
