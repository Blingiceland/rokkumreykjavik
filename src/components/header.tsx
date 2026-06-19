"use client";

import * as React from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "@/components/logo";
import { SponsorMark } from "@/components/sponsor-mark";
import { sponsors } from "@/data/sponsors";
import { site } from "@/data/site";

const navLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#hlusta", label: "Hlusta" },
  { href: "#samstarf", label: "Samstarf" },
];

type Look = "bleikt" | "svart";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [look, setLook] = React.useState<Look>("bleikt");

  React.useEffect(() => {
    const cur = document.documentElement.dataset.look;
    setLook(cur === "svart" ? "svart" : "bleikt");
  }, []);

  const toggleTheme = () => {
    const next: Look = look === "svart" ? "bleikt" : "svart";
    setLook(next);
    document.documentElement.dataset.look = next;
    try {
      localStorage.setItem("rr-look", next);
    } catch {
      /* ignore */
    }
  };

  return (
    // Opaque, same colour as the page (no blur band) so the background reads
    // uniform — the bar just matches the ground behind it.
    <header className="fixed inset-x-0 top-0 z-40 bg-base">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <a href="#top" aria-label={site.name} className="flex shrink-0 items-center">
          <Logo className="text-lg sm:text-xl" />
        </a>

        {/* Sponsors inline beside the wordmark — desktop only (mobile gets the
            dedicated scroll row below). */}
        <div className="hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto sm:gap-6 md:flex [&::-webkit-scrollbar]:hidden">
          {sponsors.map((s) => (
            <a
              key={s.id}
              href="#samstarf"
              aria-label={s.name}
              className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
            >
              <SponsorMark sponsor={s} className="h-7 w-auto" />
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={look === "svart" ? "Skipta í ljóst" : "Skipta í dökkt"}
            className="grid h-9 w-9 shrink-0 place-items-center border-2 border-bone text-bone transition-colors hover:bg-amber"
          >
            {look === "svart" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="grid h-9 w-9 shrink-0 place-items-center text-bone md:hidden"
            aria-label={open ? "Loka valmynd" : "Opna valmynd"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile: a dedicated horizontally-scrollable sponsor row. */}
      <div className="border-t border-base-line md:hidden">
        <div className="flex items-center gap-6 overflow-x-auto px-4 py-2 [&::-webkit-scrollbar]:hidden">
          {sponsors.map((s) => (
            <a
              key={s.id}
              href="#samstarf"
              aria-label={s.name}
              className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
            >
              <SponsorMark sponsor={s} className="h-6 w-auto" />
            </a>
          ))}
        </div>
      </div>

      {open && (
        <div className="border-y-2 border-bone bg-base md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 font-display uppercase tracking-wide text-bone hover:text-neon"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
