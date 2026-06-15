"use client";

import { motion } from "framer-motion";
import { Handshake, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { sponsors, treatmentClass } from "@/data/sponsors";
import { site } from "@/data/site";
import { cn } from "@/lib/utils/cn";

export function SponsorSection() {
  return (
    <section id="samstarf" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-base-line bg-base-card"
      >
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-grid h-12 w-12 place-items-center rounded-full border border-base-line text-neon-cyan">
              <Handshake size={20} />
            </span>
            <h2 className="font-display text-4xl text-bone sm:text-5xl">
              Verið með <span className="text-neon">okkur</span>
            </h2>
            <p className="mt-3 max-w-md text-bone-dim">
              {site.name} setur íslenska tónlist í forgrunn í fjóra laugardaga — ókeypis fyrir
              alla. Styrktaraðilar fá sýnileika á öllum stöðum, í dagskrá og á netinu.
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className={buttonVariants({ variant: "neon" }) + " mt-6"}
            >
              Hafa samband <ArrowUpRight size={16} />
            </a>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bone-faint">
              Núverandi samstarfsaðilar
            </p>
            <div
              className={
                sponsors.length === 1
                  ? "grid grid-cols-1"
                  : "grid grid-cols-1 gap-3 sm:grid-cols-2"
              }
            >
              {sponsors.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-base-line bg-base px-4 py-5 transition-colors hover:border-neon"
                >
                  <div className="flex h-16 w-full items-center justify-center">
                    {s.logo ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.logo}
                          alt={`${s.name} logo`}
                          className={cn(
                            "sponsor-logo max-h-14 max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100",
                            s.treatment && treatmentClass[s.treatment]
                          )}
                        />
                      </>
                    ) : (
                      // No artwork yet — tidy wordmark placeholder.
                      <span className="font-display text-2xl uppercase tracking-[0.15em] text-bone-dim transition-colors group-hover:text-neon sm:text-3xl">
                        {s.name}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-bone-faint">
                    {s.tier}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
