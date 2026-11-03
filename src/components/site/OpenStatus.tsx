import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {status?.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            status ? (status.open ? "bg-whatsapp" : "bg-signal") : "bg-muted-foreground",
          )}
        />
      </span>
      {status ? status.label : "Consultando horario…"}
    </span>
  );
}
