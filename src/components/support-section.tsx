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
    <section id="styrkja" className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-base-line bg-base-card px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">Ókeypis aðgangur</p>
          <p className="mt-1 font-body text-bone-dim">
            {site.name} lifir á velvild — enginn miði, ekkert verð.
          </p>
        </div>
        <a
          href="#"
          className={buttonVariants({ size: "sm", variant: "ghost" }) + " shrink-0"}
        >
          Styrkja
        </a>
      </motion.div>
    </section>
  );
}
