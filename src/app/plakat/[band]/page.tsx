import { notFound } from "next/navigation";
import { getArtistBySlug, artists } from "@/data/artists";
import { BandPoster } from "@/components/poster/band-poster";
import { PosterBuilder, PosterPreview, coercePosterValues } from "@/components/poster/poster-builder";

export function generateStaticParams() {
  return artists.map((a) => ({ band: a.slug }));
}

type Search = { utgafa?: string; snid?: string; thema?: string };

export default function BandPosterPage({
  params,
  searchParams,
}: {
  params: { band: string };
  searchParams: Search;
}) {
  const artist = getArtistBySlug(params.band);
  if (!artist) notFound();

  const values = coercePosterValues(searchParams);

  return (
    <PosterBuilder
      title={`Plakat — ${artist.name}`}
      subtitle={`${artist.displayDate} · veldu útgáfu, snið og þema — sæktu sem PDF, JPEG eða PNG.`}
      values={values}
      downloadBase={`/api/plakat?kind=band&id=${artist.slug}`}
      shareNote="Hlekkurinn á þessa síðu er deilanlegur — sendu hann á bandið og þau sækja sitt eigið plakat."
      preview={
        <PosterPreview format={values.format}>
          <BandPoster artist={artist} variant={values.variant} format={values.format} theme={values.theme} />
        </PosterPreview>
      }
    />
  );
}
