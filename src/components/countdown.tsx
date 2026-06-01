"use client";

import * as React from "react";
import { events } from "@/data/events";

const FIRST_EVENT_ISO = `${events[0].date}T20:00:00+00:00`;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: number): TimeLeft | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "dagar" },
  { key: "hours", label: "klst" },
  { key: "minutes", label: "mín" },
  { key: "seconds", label: "sek" },
];

export function Countdown() {
  const target = React.useMemo(() => new Date(FIRST_EVENT_ISO).getTime(), []);
  const [left, setLeft] = React.useState<TimeLeft | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setLeft(diff(target));
    const t = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <section className="relative z-10 border-y border-base-line bg-base-deep/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:flex-row sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
            {left ? "Niðurtalning að fyrsta degi" : "Rokkpartýið er hafið"}
          </p>
          <p className="mt-1 font-display text-2xl text-bone sm:text-3xl">
            {events[0].displayDate}
          </p>
        </div>

        <div
          className="flex items-center gap-3 sm:gap-4"
          role="timer"
          aria-live="polite"
          aria-label="Niðurtalning að fyrsta degi"
        >
          {/* Avoid hydration mismatch: render dashes until mounted. */}
          {units.map(({ key, label }) => (
            <div
              key={key}
              className="poster-frame flex w-16 flex-col items-center rounded-xl bg-base-card px-3 py-3 sm:w-20"
            >
              <span className="font-display text-3xl tabular-nums text-bone sm:text-4xl">
                {mounted && left ? String(left[key]).padStart(2, "0") : "--"}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-bone-faint">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
