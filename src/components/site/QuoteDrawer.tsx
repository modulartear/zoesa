import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { waLink } from "@/lib/business";
import { buildQuoteMessage, useQuote } from "@/lib/quote-list";
import { WhatsAppIcon } from "./icons";

export function QuoteDrawer() {
  const { items, open, setOpen, remove, clear } = useQuote();
  const [name, setName] = useState("");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="border-b border-border bg-ink p-6 text-ink-foreground">
          <SheetTitle className="font-display text-3xl font-extrabold uppercase italic text-ink-foreground">
            Mi consulta
          </SheetTitle>
          <SheetDescription className="text-ink-muted">
            Sumá productos y envianos todo junto por WhatsApp. Te respondemos con precio, stock y
            financiación.
          </SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-2xl font-bold uppercase italic">Tu lista está vacía</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tocá “Agregar a mi consulta” en cualquier producto.
              </p>
              <div className="mt-6 flex gap-2">
                <Link
                  to="/motos"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  Ver motos
                </Link>
                <Link
                  to="/hogar"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-bold"
                >
                  Ver hogar
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2">
                  <img src={p.image} alt={p.name} className="h-16 w-20 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                    <p className="truncate font-semibold">{p.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    aria-label={`Quitar ${p.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-border p-6">
            <label className="block text-sm font-semibold" htmlFor="quote-name">
              Tu nombre (opcional)
            </label>
            <input
              id="quote-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Laura"
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <a
              href={waLink(buildQuoteMessage(items, name.trim() || undefined))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Enviar consulta ({items.length})
            </a>
            <button
              type="button"
              onClick={clear}
              className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" /> Vaciar lista
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
