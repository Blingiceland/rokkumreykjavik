import { cn } from "@/lib/utils/cn";

/**
 * Wordmark for Rokk í Reykjavík — the heritage name (after the 1982 cult
 * documentary). Carried with weight; the neon accent sits on "Reykjavík".
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      Rokk í <span className="text-neon">Reykjavík</span>
    </span>
  );
}
