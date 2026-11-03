import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./catalog";

type QuoteCtx = {
  items: Product[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<QuoteCtx | null>(null);
const KEY = "zoesa-consulta";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids, loaded]);

  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [],
  );
  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<QuoteCtx>(
    () => ({
      items: ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[],
      has: (id) => ids.includes(id),
      toggle,
      remove,
      clear,
      open,
      setOpen,
    }),
    [ids, toggle, remove, clear, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}

export function buildQuoteMessage(items: Product[], name?: string) {
  const lines = items.map((p) => `• ${p.name} (${p.category})`);
  return [
    `¡Hola Zoesa!${name ? ` Soy ${name}.` : ""} Quiero consultar precio, stock y financiación de:`,
    ...lines,
    "¡Gracias!",
  ].join("\n");
}
