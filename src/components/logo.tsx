import { cn } from "@/lib/utils/cn";

/**
 * Wordmark for Rokk(um) Reykjavík. The bracketed "(um)" is the brand's hinge —
 * "Rokk" + the call to action "Rokkum" (let's rock). Rendered with the accent.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      Rokk<span className="text-neon">(um)</span> Reykjavík
    </span>
  );
}
