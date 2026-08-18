import { cn } from "@/lib/cn";

export function StatusBadge({
  label,
  active = true,
  className,
}: {
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider",
        className
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0", active ? "bg-signal animate-blink" : "bg-mist-400")}
        aria-hidden
      />
      {label}
    </span>
  );
}
