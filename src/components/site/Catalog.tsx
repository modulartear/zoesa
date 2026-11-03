import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export function Catalog({ products }: { products: Product[] }) {
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "Todos" || p.category === cat) &&
        (!term || [p.name, p.category, p.tagline, ...p.specs].join(" ").toLowerCase().includes(term)),
    );
  }, [products, cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:border-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Buscar</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar producto…"
            className="h-11 w-full rounded-full border border-input bg-card pr-10 pl-11 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Limpiar búsqueda"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-3xl border border-dashed border-border p-12 text-center">
          <p className="font-display text-2xl font-bold uppercase italic">No encontramos ese producto</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Puede que lo tengamos igual: escribinos por WhatsApp y lo consultamos.
          </p>
        </div>
      )}
    </div>
  );
}
