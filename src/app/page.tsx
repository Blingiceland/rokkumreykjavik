import { ThuleHero } from "@/components/thule/thule-hero";
import { Schedule } from "@/components/schedule";
import { PlaylistSection } from "@/components/playlist-section";
import { SignupSection } from "@/components/signup-section";
import { SponsorSection } from "@/components/sponsor-section";
import { Footer } from "@/components/footer";
import { sponsors } from "@/data/sponsors";
import { thuleVariants, defaultThuleVariant } from "@/data/thule-variants";

// Nav sponsor lineup: Rás 2 leads dead-centre (biggest); Four Roses & Shanky's
// flank it; the rest sit further out. Thule is excluded — it leads the hero
// lockup. Rás 2's mark here is interim; a new logo is pending.
type NavMark = { logo: string; name: string; treatment?: string; h: number };

function navMark(id: string, h: number): NavMark {
  if (id === "ras2") return { logo: "/images/logos/ras2.svg", name: "Rás 2", treatment: "ink", h };
  const s = sponsors.find((x) => x.id === id)!;
  return { logo: s.logo, name: s.name, treatment: s.treatment, h };
}

// Centre-out order (left → right) so Rás 2 sits in the middle.
const NAV_MARKS: NavMark[] = [
  navMark("helix7", 1.6),
  navMark("planteray", 1.6),
  navMark("four-roses", 2.1),
  navMark("ras2", 2.8),
  navMark("shankys", 2.1),
  navMark("askur", 1.6),
  navMark("icelandic-glacial", 1.6),
];

// The public site ships in the Thule "Dósin" look. The /thule route keeps the
// switcher for previewing the other treatments; here the look is fixed.
const dosin = thuleVariants.find((v) => v.id === "dosin") ?? defaultThuleVariant;

const navLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#hlusta", label: "Hlusta" },
  { href: "#samstarf", label: "Samstarf" },
];

/** One nav sponsor logo. Inked (white on the dark ground) unless it keeps its
 *  own colours (Shanky's). `scale` shrinks the whole row on mobile. */
function NavMarkLogo({ mark, scale = 1 }: { mark: NavMark; scale?: number }) {
  const filter =
    mark.treatment === "ink" ? "sponsor-ink" : mark.treatment === "keep" ? "" : "sponsor-logo";
  return (
    <a
      href="#samstarf"
      aria-label={mark.name}
      className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mark.logo}
        alt={`${mark.name} logo`}
        className={`w-auto object-contain ${filter}`}
        style={{ height: `${mark.h * scale}rem` }}
      />
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-base">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center">
          <span className="font-display text-lg uppercase tracking-tight text-bone">Rokk í Reykjavík</span>
        </a>

        {/* Sponsor logos centred in the bar — Rás 2 biggest, Four Roses & Shanky's beside it. */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 overflow-x-auto md:flex [&::-webkit-scrollbar]:hidden">
          {NAV_MARKS.map((m) => (
            <NavMarkLogo key={m.name} mark={m} />
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-6 md:flex">
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
      </nav>

      {/* Mobile: a dedicated horizontally-scrollable sponsor row. */}
      <div className="border-t border-base-line md:hidden">
        <div className="flex items-center gap-5 overflow-x-auto px-4 py-2.5 [&::-webkit-scrollbar]:hidden">
          {NAV_MARKS.map((m) => (
            <NavMarkLogo key={m.name} mark={m} scale={0.82} />
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <ThuleHero variant={dosin} />
        <Schedule />
        <PlaylistSection />
        <SignupSection />
        <SponsorSection />
      </main>
      <Footer />
    </>
  );
}
