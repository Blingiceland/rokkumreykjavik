import type { CSSProperties } from "react";
import type { Sponsor } from "@/data/sponsors";
import { cn } from "@/lib/utils/cn";

/** A single sponsor logo. "keep" renders the original colours (Thule's red);
 * "ink" flattens to one theme-aware ink; anything else uses the legacy print. */
export function SponsorMark({
  sponsor,
  className,
  style,
}: {
  sponsor: Sponsor;
  className?: string;
  style?: CSSProperties;
}) {
  const filter =
    sponsor.treatment === "ink" ? "sponsor-ink" : sponsor.treatment === "keep" ? "" : "sponsor-logo";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={sponsor.logo} alt={`${sponsor.name} logo`} className={cn("object-contain", filter, className)} style={style} />
  );
}
