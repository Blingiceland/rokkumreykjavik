"use client";

import * as React from "react";
import { Palette, X, RotateCcw } from "lucide-react";
import {
  thuleVariants,
  editableTokens,
  thulePalette,
  type ThuleVariant,
} from "@/data/thule-variants";

/** "r g b" (space-separated channel triplet) -> "#rrggbb" for <input type=color>. */
function tripletToHex(triplet: string): string {
  const [r, g, b] = triplet.trim().split(/\s+/).map(Number);
  if ([r, g, b].some((n) => Number.isNaN(n))) return "#000000";
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

/** "#rrggbb" -> "r g b" triplet for the CSS variable. */
function hexToTriplet(hex: string): string {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function readVar(name: string): string {
  if (typeof window === "undefined") return "0 0 0";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "0 0 0";
}

export function ThuleSwitcher({
  active,
  onSelect,
}: {
  active: ThuleVariant;
  onSelect: (v: ThuleVariant) => void;
}) {
  const [open, setOpen] = React.useState(true);
  // Bumped to force the colour inputs to re-read the live CSS vars (after a
  // variant switch or reset clears any inline overrides).
  const [readKey, setReadKey] = React.useState(0);

  const selectVariant = (v: ThuleVariant) => {
    // Drop any live tweaks so the variant's own CSS block takes over cleanly.
    editableTokens.forEach((t) => document.documentElement.style.removeProperty(t.varName));
    onSelect(v);
    setReadKey((k) => k + 1);
  };

  const setToken = (varName: string, hex: string) => {
    document.documentElement.style.setProperty(varName, hexToTriplet(hex));
  };

  const applyPalette = (varName: string, rgb: [number, number, number]) => {
    document.documentElement.style.setProperty(varName, rgb.join(" "));
    setReadKey((k) => k + 1);
  };

  const resetTweaks = () => {
    editableTokens.forEach((t) => document.documentElement.style.removeProperty(t.varName));
    setReadKey((k) => k + 1);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Opna útlitsstýringu"
        className="fixed bottom-4 right-4 z-[200] grid h-12 w-12 place-items-center border-2 border-bone bg-base text-bone shadow-lg"
      >
        <Palette size={18} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[200] w-[19rem] max-w-[calc(100vw-2rem)] border-2 border-bone bg-base text-bone shadow-2xl">
      <div className="flex items-center justify-between border-b-2 border-bone px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon">Thule · útlit</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Loka" className="text-bone-dim hover:text-bone">
          <X size={16} />
        </button>
      </div>

      <div className="max-h-[78vh] overflow-y-auto p-3">
        {/* Variant picker. */}
        <div className="grid grid-cols-2 gap-2">
          {thuleVariants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => selectVariant(v)}
              className={
                "border-2 px-2 py-1.5 text-left font-display text-sm uppercase leading-tight transition-colors " +
                (v.id === active.id
                  ? "border-neon bg-neon text-[color:rgb(var(--c-base))]"
                  : "border-bone text-bone hover:bg-base-card")
              }
            >
              {v.name}
            </button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-bone-faint">{active.blurb}</p>

        {/* Live colour editor. */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">Litir</span>
          <button
            type="button"
            onClick={resetTweaks}
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-bone-faint hover:text-bone"
          >
            <RotateCcw size={11} /> Núllstilla
          </button>
        </div>
        <div className="mt-2 space-y-1.5" key={readKey}>
          {editableTokens.map((t) => (
            <label key={t.varName} className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-bone-dim">{t.label}</span>
              <input
                type="color"
                defaultValue={tripletToHex(readVar(t.varName))}
                onInput={(e) => setToken(t.varName, e.currentTarget.value)}
                className="h-7 w-12 cursor-pointer border border-bone bg-transparent"
              />
            </label>
          ))}
        </div>

        {/* Quick-apply Thule palette swatches. Click a swatch, then a slot. */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">Paletta</p>
        <div className="mt-2 space-y-2">
          {editableTokens.map((t) => (
            <div key={t.varName} className="flex items-center gap-1.5">
              <span className="w-20 shrink-0 font-mono text-[10px] text-bone-faint">{t.label}</span>
              {thulePalette.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  title={`${t.label} → ${p.label}`}
                  aria-label={`${t.label} → ${p.label}`}
                  onClick={() => applyPalette(t.varName, p.rgb)}
                  className="h-5 w-5 shrink-0 border border-bone"
                  style={{ backgroundColor: `rgb(${p.rgb.join(",")})` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
