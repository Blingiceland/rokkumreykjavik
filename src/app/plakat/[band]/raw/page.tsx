import { notFound } from "next/navigation";
import { getArtistBySlug, artists } from "@/data/artists";
import { BandPoster, POSTER_SIZES } from "@/components/poster/band-poster";
import { coercePosterValues } from "@/components/poster/poster-builder";

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

  const { variant, format, theme } = coercePosterValues(searchParams);
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
