import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/business";
import { WhatsAppIcon } from "./icons";

const TOPICS = [
  { label: "Quiero una moto", msg: "¡Hola Zoesa! Quiero consultar por motos 🏍️" },
  { label: "Electrodomésticos", msg: "¡Hola Zoesa! Quiero consultar por electrodomésticos 🏠" },
  { label: "Turno de taller", msg: "¡Hola Zoesa! Quiero pedir un turno para el taller 🔧" },
  { label: "Repuestos", msg: "¡Hola Zoesa! Busco un repuesto para mi moto." },
];

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-pop"
          >
            <div className="bg-whatsapp px-4 py-3 text-whatsapp-foreground">
              <p className="font-display text-xl font-bold uppercase italic">¿En qué te ayudamos?</p>
              <p className="text-xs opacity-90">Respondemos en horario comercial</p>
            </div>
            <div className="space-y-1.5 p-3">
              {TOPICS.map((t) => (
                <a
                  key={t.label}
                  href={waLink(t.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-muted px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  {t.label}
                </a>
              ))}
              <p className="px-1 pt-1 text-[11px] text-muted-foreground">
                También: {BUSINESS.phones[1].display}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar opciones de WhatsApp" : "Abrir WhatsApp"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-pop transition-transform hover:scale-110 animate-pulse-ring"
      >
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
