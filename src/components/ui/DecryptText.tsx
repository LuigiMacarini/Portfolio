"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAME_MS = 32;
const TOTAL_FRAMES = 14;

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function scrambleAt(text: string, frame: number) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      const revealAt = (index / text.length) * TOTAL_FRAMES * 0.6;
      return frame >= revealAt + TOTAL_FRAMES * 0.4 ? char : randomChar();
    })
    .join("");
}

export function DecryptText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        timeoutId = window.setTimeout(() => {
          let frame = 0;
          intervalId = window.setInterval(() => {
            frame += 1;
            if (frame >= TOTAL_FRAMES) {
              window.clearInterval(intervalId);
              setDisplay(text);
              return;
            }
            setDisplay(scrambleAt(text, frame));
          }, FRAME_MS);
        }, delay);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
