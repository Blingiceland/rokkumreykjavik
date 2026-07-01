import { ThuleHero } from "@/components/thule/thule-hero";
import { Schedule } from "@/components/schedule";
import { PlaylistSection } from "@/components/playlist-section";
import { SignupSection } from "@/components/signup-section";
import { SponsorSection } from "@/components/sponsor-section";
import { Footer } from "@/components/footer";
import { thuleVariants, defaultThuleVariant } from "@/data/thule-variants";

// The public site ships in the Thule "Dósin" look. The /thule route keeps the
// switcher for previewing the other treatments; here the look is fixed.
const dosin = thuleVariants.find((v) => v.id === "dosin") ?? defaultThuleVariant;

const navLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#hlusta", label: "Hlusta" },
  { href: "#samstarf", label: "Samstarf" },
];

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-base">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center">
          <span className="font-display text-lg uppercase tracking-tight text-bone">Rokk í Reykjavík</span>
        </a>
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
      </nav>
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
