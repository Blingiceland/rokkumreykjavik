"use client";

import * as React from "react";
import { ThuleHero, ThulePageBackground } from "@/components/thule/thule-hero";
import { ThuleSwitcher } from "@/components/thule/thule-switcher";
import { Schedule } from "@/components/schedule";
import { PlaylistSection } from "@/components/playlist-section";
import { SignupSection } from "@/components/signup-section";
import { SponsorSection } from "@/components/sponsor-section";
import { Footer } from "@/components/footer";
import { thuleVariants, defaultThuleVariant, type ThuleVariant } from "@/data/thule-variants";

const STORE_KEY = "thule-variant";

/** Lightweight Thule top bar — the public Header is skipped here because it owns
 *  the bleikt/svart toggle, which would fight the takeover look. */
function ThuleHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-base">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center">
          <span className="font-display text-lg uppercase tracking-tight text-bone">Rokk í Reykjavík</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {[
            { href: "#dagskra", label: "Dagskrá" },
            { href: "#hlusta", label: "Hlusta" },
            { href: "#samstarf", label: "Samstarf" },
            { href: "/thule/plakot", label: "Plaköt" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function ThuleTakeover() {
  const [variant, setVariant] = React.useState<ThuleVariant>(defaultThuleVariant);

  // Apply the chosen look to <html>; restore the public look on unmount so the
  // takeover never leaks onto the rest of the site.
  React.useEffect(() => {
    const html = document.documentElement;
    const previous = html.dataset.look;

    let initial = defaultThuleVariant;
    try {
      const saved = localStorage.getItem(STORE_KEY);
      const match = thuleVariants.find((v) => v.id === saved);
      if (match) initial = match;
    } catch {
      /* ignore */
    }
    setVariant(initial);
    html.dataset.look = initial.look;

    return () => {
      // Clear any live colour tweaks and hand the page back to the public look
      // (the site now ships in the Dósin look).
      html.removeAttribute("style");
      html.dataset.look = previous ?? "thule-dos";
    };
  }, []);

  const handleSelect = (v: ThuleVariant) => {
    setVariant(v);
    document.documentElement.dataset.look = v.look;
    try {
      localStorage.setItem(STORE_KEY, v.id);
    } catch {
      /* ignore */
    }
  };

  const pageBg = variant.bg && variant.bg !== "none";

  return (
    <>
      {pageBg && <ThulePageBackground variant={variant} />}
      <ThuleHeader />
      <main>
        <ThuleHero variant={variant} />
        <Schedule />
        <PlaylistSection />
        <SignupSection />
        <SponsorSection />
      </main>
      <Footer />
      <ThuleSwitcher active={variant} onSelect={handleSelect} />
    </>
  );
}
