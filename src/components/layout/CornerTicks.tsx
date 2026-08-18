import { cn } from "@/lib/cn";

const base = "pointer-events-none fixed z-40 hidden h-4 w-4 border-ink/25 md:block";

export function CornerTicks() {
  return (
    <>
      <span className={cn(base, "left-3 top-3 border-l border-t")} aria-hidden />
      <span className={cn(base, "right-3 top-3 border-r border-t")} aria-hidden />
      <span className={cn(base, "bottom-3 left-3 border-b border-l")} aria-hidden />
      <span className={cn(base, "bottom-3 right-3 border-b border-r")} aria-hidden />
    </>
  );
}
