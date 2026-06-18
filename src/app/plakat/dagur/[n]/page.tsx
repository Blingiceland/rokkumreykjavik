import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { DayPoster } from "@/components/poster/day-poster";
import { PosterBuilder, PosterPreview, coercePosterValues } from "@/components/poster/poster-builder";

export function generateStaticParams() {
  return events.map((_, i) => ({ n: String(i + 1) }));
}

type Search = { utgafa?: string; snid?: string; thema?: string };

export default function DayPosterPage({
  params,
  searchParams,
}: {
  params: { n: string };
  searchParams: Search;
}) {
  const idx = Number(params.n) - 1;
  const event = events[idx];
  if (!event) notFound();

  const values = coercePosterValues(searchParams);
  const date = event.displayDate.replace("Laugardagur ", "");

  return (
    <PosterBuilder
      title={`Plakat — Dagur ${idx + 1}`}
      subtitle={`${date} · allur dagurinn á einu plakati — veldu útgáfu, snið og þema.`}
      values={values}
      downloadBase={`/api/plakat?kind=dagur&id=${idx + 1}`}
      shareNote="Deilanlegur hlekkur — heilt dagsplakat með öllum böndum dagsins."
      preview={
        <PosterPreview format={values.format}>
          <DayPoster event={event} variant={values.variant} format={values.format} theme={values.theme} />
        </PosterPreview>
      }
    />
  );
}
