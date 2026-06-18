import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { DayPoster } from "@/components/poster/day-poster";
import { POSTER_SIZES } from "@/components/poster/band-poster";
import { coercePosterValues } from "@/components/poster/poster-builder";

export function generateStaticParams() {
  return events.map((_, i) => ({ n: String(i + 1) }));
}

type Search = { utgafa?: string; snid?: string; thema?: string };

/** Bare, full-size day poster for headless capture (/api/plakat drives this). */
export default function RawDayPosterPage({
  params,
  searchParams,
}: {
  params: { n: string };
  searchParams: Search;
}) {
  const event = events[Number(params.n) - 1];
  if (!event) notFound();

  const { variant, format, theme } = coercePosterValues(searchParams);
  const size = POSTER_SIZES[format];

  return (
    <>
      <style>{`body.grain::before{display:none!important}body{margin:0!important;overflow:hidden!important;background:transparent!important}`}</style>
      <div style={{ width: size.w, height: size.h }}>
        <DayPoster event={event} variant={variant} format={format} theme={theme} />
      </div>
    </>
  );
}
