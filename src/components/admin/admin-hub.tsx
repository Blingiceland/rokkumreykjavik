import Link from "next/link";
import { ArrowUpRight, Download, LogOut } from "lucide-react";
import { events, getEventArtists } from "@/data/events";

/** One poster row: open the builder, or grab a quick A3 PDF/JPEG/PNG. */
function Row({ label, builder, dl, lead = false }: { label: string; builder: string; dl: string; lead?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-line py-3">
      <span className={"font-display uppercase leading-none " + (lead ? "text-2xl text-bone" : "text-lg text-bone-dim")}>
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={builder}
          className="inline-flex items-center gap-1 border-2 border-bone px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-bone transition-colors hover:bg-base-card"
        >
          Opna <ArrowUpRight size={12} />
        </Link>
        {(["pdf", "jpeg", "png"] as const).map((ext) => (
          <a
            key={ext}
            href={`${dl}&ext=${ext}`}
            className="inline-flex items-center gap-1 border-2 border-bone bg-bone px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[color:rgb(var(--c-base))] transition-colors hover:border-neon hover:bg-neon"
          >
            <Download size={11} /> {ext}
          </a>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-neon">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function AdminHub({ logout }: { logout: () => void }) {
  // Sensible defaults for the quick-download links; the builder lets you tune.
  const q = "utgafa=mynd&snid=a3&thema=bleikt";

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">Admin · plaköt</p>
            <h1 className="mt-2 font-display text-4xl uppercase leading-none text-bone sm:text-5xl">Plakat-miðstöð</h1>
            <p className="mt-2 max-w-md font-mono text-[11px] leading-relaxed text-bone-faint">
              Opnaðu builder til að velja útgáfu/snið/þema, eða gríptu flýti-niðurhal (Mynd · A3 · bleikt).
            </p>
          </div>
          <form action={logout}>
            <button className="inline-flex items-center gap-1 border-2 border-bone px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-bone-dim transition-colors hover:bg-base-card">
              <LogOut size={12} /> Út
            </button>
          </form>
        </div>

        <Section title="Forsíða">
          <Row label="Rokk í Reykjavík" builder="/plakat/forsida" dl={`/api/plakat?kind=forsida&id=forsida&${q}`} lead />
        </Section>

        <Section title="Dagar">
          {events.map((e, i) => (
            <Row
              key={e.id}
              label={`Dagur ${i + 1} · ${e.displayDate.replace("Laugardagur ", "")}`}
              builder={`/plakat/dagur/${i + 1}`}
              dl={`/api/plakat?kind=dagur&id=${i + 1}&${q}`}
              lead
            />
          ))}
        </Section>

        {events.map((e, i) => (
          <Section key={e.id} title={`Bönd · Dagur ${i + 1}`}>
            {getEventArtists(e).map((a) => (
              <Row
                key={a.id}
                label={a.name}
                builder={`/plakat/${a.slug}`}
                dl={`/api/plakat?kind=band&id=${a.slug}&${q}`}
              />
            ))}
          </Section>
        ))}
      </div>
    </main>
  );
}
