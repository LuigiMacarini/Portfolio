import { cn } from "@/lib/cn";
import Image from "next/image";

export function PhotoFrame({
  label,
  caption,
  src,
  className,
}: {
  label: string;
  caption: string;
  src?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full border border-dashed border-line-strong bg-mist-50",
        className
      )}
    >
      <span className="absolute left-0 top-0 z-10 h-3 w-3 border-l border-t border-ink/40" aria-hidden />
      <span className="absolute right-0 top-0 z-10 h-3 w-3 border-r border-t border-ink/40" aria-hidden />
      <span className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l border-ink/40" aria-hidden />
      <span className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r border-ink/40" aria-hidden />

      <div className="absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-wider text-mist-400 mix-blend-difference text-paper">
        {label}
      </div>

      {src ? (
        <Image src={src} alt={caption} fill className="object-cover grayscale" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <ScanIcon className="h-14 w-14 text-mist-300" />
          <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">{caption}</p>
        </div>
      )}
    </div>
  );
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />
      <path d="M32 6V14M32 50V58M6 32H14M50 32H58" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
