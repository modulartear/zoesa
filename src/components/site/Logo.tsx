import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Zoesa, inicio">
      <span className="relative flex h-10 w-10 -skew-x-12 items-center justify-center rounded-md bg-primary font-display text-2xl font-extrabold italic text-primary-foreground shadow-glow transition-transform group-hover:-rotate-6">
        Z
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-2xl font-extrabold uppercase italic tracking-tight",
            inverted ? "text-ink-foreground" : "text-foreground",
          )}
        >
          Zoesa
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.22em]",
            inverted ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          Motos · Hogar
        </span>
      </span>
    </Link>
  );
}
