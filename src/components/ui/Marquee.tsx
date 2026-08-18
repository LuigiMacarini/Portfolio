import { cn } from "@/lib/cn";

export function Marquee({
  items,
  direction = "left",
  duration = 30,
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center" aria-hidden={rep === 1 || undefined}>
            {items.map((item, index) => (
              <span key={`${rep}-${item}-${index}`} className="flex items-center">
                <span className="whitespace-nowrap px-4 font-display text-3xl uppercase tracking-tight sm:text-4xl md:text-5xl">
                  {item}
                </span>
                <span className="text-signal" aria-hidden>
                  /
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
