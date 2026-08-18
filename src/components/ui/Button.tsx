import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "group inline-flex items-center justify-center gap-2 border px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-150";

const variants = {
  solid: "border-ink bg-ink text-paper hover:bg-paper hover:text-ink",
  outline: "border-current bg-transparent hover:bg-ink hover:text-paper hover:border-ink",
  signal: "border-ink bg-signal text-signal-ink hover:bg-ink hover:text-signal",
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface PlainButtonProps extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button(props: LinkButtonProps | PlainButtonProps) {
  const { variant = "outline", icon = true, className, children, id } = props;
  const ariaLabel = props["aria-label"];
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        id={id}
        aria-label={ariaLabel}
        className={classes}
      >
        <span>{children}</span>
        {icon && <ArrowIcon />}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      id={id}
      aria-label={ariaLabel}
      className={classes}
    >
      <span>{children}</span>
      {icon && <ArrowIcon />}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M2 10L10 2M10 2H4M10 2V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
