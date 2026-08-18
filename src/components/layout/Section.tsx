import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "paper" | "ink";
  contentClassName?: string;
  children: ReactNode;
  as?: "section" | "footer";
}

const COLUMN_COUNT = 12;

export function Section({
  id,
  tone = "paper",
  className,
  contentClassName,
  children,
  as: Tag = "section",
  ...props
}: SectionProps) {
  const isInk = tone === "ink";

  return (
    <Tag
      id={id}
      className={cn(
        "relative border-t",
        isInk ? "border-paper/15 bg-ink text-paper" : "border-line bg-paper text-ink",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 mx-auto hidden max-w-[1440px] grid-cols-12 md:grid"
      >
        {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "border-r",
              isInk ? "border-paper/15" : "border-line",
              i === COLUMN_COUNT - 1 && "border-r-0"
            )}
          />
        ))}
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28",
          contentClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
