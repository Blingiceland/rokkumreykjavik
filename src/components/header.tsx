"use client";

import * as React from "react";
import { Menu, X, Ticket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { site } from "@/data/site";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "#dagskra", label: "Dagskrá" },
  { href: "#listamenn", label: "Listamenn" },
  { href: "#midar", label: "Miðar" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-base-line bg-base/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label={site.name} className="flex items-center">
          <Logo className="text-lg sm:text-xl" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-bone-dim transition-colors hover:text-neon"
            >
              {l.label}
            </a>
          ))}
          <a href={site.defaultTicketUrl} className={buttonVariants({ size: "sm", variant: "primary" })}>
            <Ticket size={15} /> Miðar
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center text-bone md:hidden"
          aria-label={open ? "Loka valmynd" : "Opna valmynd"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-base-line bg-base/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-display uppercase tracking-wide text-bone hover:bg-base-raised hover:text-neon"
              >
                {l.label}
              </a>
            ))}
            <a href={site.defaultTicketUrl} className={buttonVariants({ variant: "primary" }) + " mt-2 w-full"}>
              <Ticket size={16} /> Kaupa miða
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
