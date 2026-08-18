import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-wider text-mist-500",
        className
      )}
    >
      {children}
    </span>
  );
}
