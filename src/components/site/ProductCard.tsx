import { motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";
import { waLink } from "@/lib/business";
import { useQuote } from "@/lib/quote-list";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { has, toggle, setOpen } = useQuote();
  const added = has(product.id);

  const onToggle = () => {
    toggle(product.id);
    if (!added) {
      toast.success(`${product.name} agregado a tu consulta`, {
        action: { label: "Ver lista", onClick: () => setOpen(true) },
      });
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-pop"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {product.category}
        </span>
        {product.badge && (
          <span className="absolute top-3 right-3 -skew-x-12 rounded-md bg-signal px-3 py-1 text-xs font-bold uppercase text-signal-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-bold uppercase italic">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.specs.map((s) => (
            <li key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-5">
          <a
            href={waLink(`¡Hola Zoesa! Quiero consultar precio y financiación de: ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Consultar
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={added}
            aria-label={added ? `Quitar ${product.name} de mi consulta` : `Agregar ${product.name} a mi consulta`}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all",
              added
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:bg-accent",
            )}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
