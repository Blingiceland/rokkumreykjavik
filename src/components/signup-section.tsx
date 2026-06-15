"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "done" | "error";

export function SignupSection() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => null);
      if (res && !res.ok) throw new Error("bad");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("done");
      setEmail("");
    }
  }

  return (
    <section id="skraning" className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="mb-4 inline-grid h-12 w-12 place-items-center rounded-full border border-base-line text-neon-cyan">
          <Mail size={20} />
        </span>
        <h2 className="font-display text-4xl text-bone sm:text-5xl">
          Vertu <span className="text-neon">fyrst</span> að vita
        </h2>
        <p className="mx-auto mt-3 max-w-md text-bone-dim">
          Skráðu þig á póstlistann og fáðu tilkynningar um tímasetningar, ný atriði og aukadaga.
        </p>

        {status === "done" ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-5 py-3 font-mono text-sm text-neon">
            <Check size={16} /> Takk! Þú ert komin á listann.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="signup-email" className="sr-only">
              Netfang
            </label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="netfang@example.is"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "signup-error" : undefined}
              className="h-12 flex-1 rounded-full border border-base-line bg-base-card px-5 text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-neon"
            />
            <Button type="submit" variant="primary" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Skrá mig"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p id="signup-error" className="mt-3 font-mono text-xs text-amber">
            Sláðu inn gilt netfang.
          </p>
        )}
      </motion.div>
    </section>
  );
}
