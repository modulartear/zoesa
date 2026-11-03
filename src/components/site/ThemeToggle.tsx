import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:scale-105 hover:border-primary",
        className,
      )}
    >
      <Sun className={cn("h-4 w-4 transition-all", dark ? "scale-0 rotate-90" : "scale-100 rotate-0")} />
      <Moon
        className={cn("absolute h-4 w-4 transition-all", dark ? "scale-100 rotate-0" : "scale-0 -rotate-90")}
      />
    </button>
  );
}
