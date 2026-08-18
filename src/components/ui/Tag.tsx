import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({
  children,
  className,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ink";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-wider",
        tone === "ink" ? "border-paper/20 text-paper/60" : "border-line text-mist-500",
        className
      )}
    >
      {children}
    </span>
  );
}
