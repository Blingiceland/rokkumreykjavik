"use client";

import { Logo } from "@/components/logo";
import { site, venue, EVENT_YEAR } from "@/data/site";

const footerLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#listamenn", label: "Listamenn" },
  { href: "#styrkja", label: "Styrkja" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-base-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
