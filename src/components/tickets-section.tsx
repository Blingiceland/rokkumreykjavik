"use client";

import { motion } from "framer-motion";
import { Ticket, Star, Check } from "lucide-react";
import { SectionLabel } from "@/components/schedule";
import { buttonVariants } from "@/components/ui/button";
import { ticketTiers } from "@/data/tickets";
import { cn } from "@/lib/utils/cn";

export function TicketsSection() {
  const singles = ticketTiers.filter((t) => t.kind === "single-night");
  const pass = ticketTiers.find((t) => t.kind === "festival-pass");

  return (
    <section id="midar" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Tryggðu þér pláss" title="Mið" accent="ar" />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Single-night tickets */}
        <div className="grid gap-3 sm:grid-cols-2">
          {singles.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="poster-frame flex flex-col rounded-2xl border border-base-line bg-base-card p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-bone-faint">
                Stakur dagur
              </p>
              <h3 className="mt-1 font-display text-xl text-bone">{t.description}</h3>
              <p className="font-mono text-xs text-bone-dim">{t.name}</p>
              <p className="mt-4 font-display text-3xl text-neon">{t.priceDisplay}</p>
              <a
                href={t.ticketUrl}
                className={buttonVariants({ variant: "ghost", size: "sm" }) + " mt-4"}
              >
                <Ticket size={14} /> Kaupa
              </a>
            </motion.div>
          ))}
        </div>

        {/* Festival pass — featured */}
        {pass && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber/50 bg-base-card p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(120% 90% at 80% 0%, rgba(255,157,60,0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber">
                <Star size={12} /> Besti dílinn
              </span>
              <h3 className="mt-4 font-display text-3xl text-bone">{pass.name}</h3>
              <p className="mt-2 text-bone-dim">{pass.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-bone-dim">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-neon" /> Allir fjórir laugardagar
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-neon" /> Öll 16 böndin
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-neon" /> Spara miðað við staka daga
                </li>
              </ul>
            </div>
            <div className="relative mt-8">
              <p className="font-display text-4xl text-amber">{pass.priceDisplay}</p>
              <a
                href={pass.ticketUrl}
                className={buttonVariants({ variant: "primary" }) + " mt-4 w-full"}
              >
                <Ticket size={16} /> Kaupa passa
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <p className="mt-6 font-mono text-xs text-bone-faint">
        18 ára aldurstakmark · Bar á staðnum · Verð geta breyst · Nánari upplýsingar við kaup.
      </p>
    </section>
  );
}
