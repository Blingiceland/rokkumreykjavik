"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

/**
 * Free-admission + support block. The festival is always free; this replaces
 * the old ticket sales. Single placeholder button (leads to "#" for now) —
 * no payment flow, no tiers. Wire it up later.
 */
export function SupportSection() {
  return (
    <section id="styrkja" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="poster-frame relative overflow-hidden rounded-3xl border border-base-line bg-base-card px-6 py-16 text-center sm:px-12 sm:py-20"
      >
        {/* Faint diagonal print texture */}
        <span
          aria-hidden="true"
          className="hatch pointer-events-none absolute inset-0 opacity-[0.05]"
        />

        <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-neon">
          Aðgangur er alltaf ókeypis
        </p>
        <h2 className="relative mx-auto mt-4 max-w-3xl font-display text-4xl leading-[0.95] text-bone sm:text-6xl">
          Frítt inn. <span className="text-neon">Allir velkomnir.</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-bone-dim">
          {site.name} lifir á velvild. Enginn miði, ekkert verð — bara tónlist.
          Viltu hjálpa okkur að halda þessu gangandi?
        </p>

        <a
          href="#"
          className={
            buttonVariants({ size: "lg", variant: "primary" }) +
            " relative mt-9 !h-auto max-w-full !whitespace-normal py-4 text-center leading-tight"
          }
        >
          Viltu styrkja {site.name}?
        </a>
      </motion.div>
    </section>
  );
}
