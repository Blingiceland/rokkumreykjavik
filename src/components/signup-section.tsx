"use client";

import * as React from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { SectionLabel } from "@/components/schedule";

type Status = "idle" | "loading" | "done" | "error";

/**
 * Mailing-list signup, in the silkscreen language (hard-edged stamp boxes, no
 * rounded SaaS pills). Posts to /api/subscribe, which forwards to
 * NEWSLETTER_WEBHOOK when set (Mailchimp/Buttondown/Sheet webhook) and stores
 * nothing itself.
 */
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
    <section id="skraning" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionLabel kicker="Fylgstu með" title="Póst" accent="listinn" />

      <div className="relative overflow-hidden border-2 border-bone bg-base-card p-6 sm:p-8">
        <span aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-[0.18]" />

        <div className="relative flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-bone bg-neon text-[color:rgb(var(--c-base))]">
            <Mail size={26} />
          </span>
          <div>
            <p className="font-display text-2xl uppercase leading-none text-bone sm:text-3xl">
              Viltu vita meira?
            </p>
            <p className="mt-2 max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-widest text-bone-dim">
              Tímasetningar, ný atriði, aukadagar og tilboð — beint í pósthólfið. Aðgangur er alltaf
              ókeypis, við látum þig bara vita.
            </p>
          </div>
        </div>

        {status === "done" ? (
          <p className="relative mt-7 inline-flex items-center gap-2 border-2 border-bone bg-neon px-5 py-3 font-display text-sm uppercase tracking-wide text-[color:rgb(var(--c-base))]">
            <Check size={16} /> Takk! Þú ert komin/n á listann.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
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
              className="h-12 flex-1 border-2 border-bone bg-base px-4 font-mono text-sm text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-neon"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 items-center justify-center gap-2 border-2 border-bone bg-amber px-6 font-display text-sm uppercase tracking-wide text-bone transition-colors hover:bg-neon hover:text-[color:rgb(var(--c-base))] disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Skrá mig"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p id="signup-error" className="relative mt-3 font-mono text-xs uppercase tracking-widest text-amber">
            Sláðu inn gilt netfang.
          </p>
        )}

        {status !== "done" && (
          <p className="relative mt-4 font-mono text-[10px] uppercase tracking-widest text-bone-faint">
            Ekkert spam · afskráning hvenær sem er
          </p>
        )}
      </div>
    </section>
  );
}
