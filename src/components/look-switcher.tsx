"use client";

import * as React from "react";

// Local-only palette switcher for the pönk design. Toggles [data-look] on
// <html>, which re-themes the whole site via CSS variables.
const LOOKS = [
  { id: "bleikt", label: "Bleikt" },
  { id: "rautt", label: "Rautt" },
  { id: "acid", label: "Sýra" },
] as const;

type LookId = (typeof LOOKS)[number]["id"];

export function LookSwitcher() {
  const [look, setLook] = React.useState<LookId>("bleikt");

  React.useEffect(() => {
    const saved = localStorage.getItem("rr-look");
    const next = LOOKS.some((l) => l.id === saved) ? (saved as LookId) : "bleikt";
    setLook(next);
    document.documentElement.dataset.look = next;
  }, []);

  const choose = (id: LookId) => {
    setLook(id);
    document.documentElement.dataset.look = id;
    try {
      localStorage.setItem("rr-look", id);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed left-1/2 top-3 z-[200] -translate-x-1/2 print:hidden">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-lg backdrop-blur">
        <span className="px-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">Litir</span>
        {LOOKS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => choose(l.id)}
            aria-pressed={look === l.id}
            className={
              "rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors " +
              (look === l.id ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-200")
            }
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
