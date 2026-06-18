import { notFound } from "next/navigation";
import { getArtistBySlug, artists } from "@/data/artists";
import {
  BandPoster,
  POSTER_SIZES,
  type PosterVariant,
  type PosterFormat,
  type PosterTheme,
} from "@/components/poster/band-poster";

export function generateStaticParams() {
  return artists.map((a) => ({ band: a.slug }));
}

type Search = { utgafa?: string; snid?: string; thema?: string };

/**
 * Bare, full-size poster for headless capture (/api/plakat drives this).
 * No site chrome; the global viewport grain is suppressed so only the poster's
 * own print-craft is captured.
 */
export default function RawPosterPage({
  params,
  searchParams,
}: {
  params: { band: string };
  searchParams: Search;
}) {
  const artist = getArtistBySlug(params.band);
  if (!artist) notFound();

  const variant: PosterVariant = (["mynd", "typo", "klassik"] as const).includes(searchParams.utgafa as PosterVariant)
    ? (searchParams.utgafa as PosterVariant)
    : "mynd";
  const format: PosterFormat = (["a3", "p45", "story", "square"] as const).includes(searchParams.snid as PosterFormat)
    ? (searchParams.snid as PosterFormat)
    : "a3";
  const theme: PosterTheme = searchParams.thema === "svart" ? "svart" : "bleikt";
  const size = POSTER_SIZES[format];

  return (
    <>
      {/* Strip the global viewport grain + body chrome for a clean capture. */}
      <style>{`body.grain::before{display:none!important}body{margin:0!important;overflow:hidden!important;background:transparent!important}`}</style>
      <div style={{ width: size.w, height: size.h }}>
        <BandPoster artist={artist} variant={variant} format={format} theme={theme} />
      </div>
    </>
  );
}
