"use client";

import { Smartphone } from "lucide-react";
import { Logo } from "@/components/logo";
import { site, venue, EVENT_YEAR } from "@/data/site";

const footerLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#listamenn", label: "Listamenn" },
  { href: "#midar", label: "Miðar" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-base-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Future-app teaser — structured for later expansion into an app */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-base-line bg-base-card p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-base-line text-neon-cyan">
              <Smartphone size={18} />
            </span>
            <div>
              <p className="font-display text-lg text-bone">Appið er á leiðinni</p>
              <p className="font-mono text-xs text-bone-dim">
                Dagskráin í vasann, vaktaðu uppáhalds böndin þín og fáðu áminningar.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-base-raised px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-bone-faint">
            Væntanlegt
          </span>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-3 max-w-sm text-sm text-bone-dim">{site.description}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-3 inline-block font-mono text-xs text-bone-dim transition-colors hover:text-neon"
            >
              {site.contactEmail}
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-bone-dim">
            {footerLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-neon">
                {l.label}
              </a>
            ))}
            <a href="#samstarf" className="hover:text-neon">
              Samstarf
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-base-line pt-6 font-mono text-[11px] uppercase tracking-wide text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {EVENT_YEAR} {site.name} · {site.domain}
          </span>
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neon"
          >
            {venue.name} · {venue.streetAddress} · {venue.locality}
          </a>
        </div>
      </div>
    </footer>
  );
}
