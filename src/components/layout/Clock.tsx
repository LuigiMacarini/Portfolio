"use client";

import { useEffect, useState } from "react";

function formatOffset(date: Date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offsetMinutes) / 60);
  return `UTC${sign}${hours}`;
}

export function Clock() {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDisplay(`${time} ${formatOffset(now)}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{display ?? "--:--:-- UTC+0"}</span>;
}
