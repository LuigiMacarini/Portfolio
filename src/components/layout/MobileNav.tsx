"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
}

export function MobileNav({
  items,
  resumeHref,
  resumeLabel,
}: {
  items: NavItem[];
  resumeHref: string;
  resumeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-ink"
      >
        <span
          className={cn(
            "h-px w-4 bg-ink transition-transform",
            open && "translate-y-[3.5px] rotate-45"
          )}
        />
        <span
          className={cn(
            "h-px w-4 bg-ink transition-transform",
            open && "-translate-y-[3.5px] -rotate-45"
          )}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center gap-10 bg-paper px-8">
          <nav className="flex flex-col gap-5">
            {items.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-3xl uppercase tracking-tight"
              >
                <span className="font-mono text-xs text-mist-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={resumeHref}
            className="font-mono text-xs uppercase tracking-wider text-mist-500 underline underline-offset-4"
          >
            {resumeLabel} ↓
          </a>
        </div>
      )}
    </div>
  );
}
