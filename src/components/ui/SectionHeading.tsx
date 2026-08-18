import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string[];
  className?: string;
  muted?: boolean;
}

export function SectionHeading({ eyebrow, heading, className, muted }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p
        className={cn(
          "font-mono text-xs uppercase tracking-[0.15em]",
          muted ? "text-paper/50" : "text-mist-500"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl font-medium uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
        {heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}
