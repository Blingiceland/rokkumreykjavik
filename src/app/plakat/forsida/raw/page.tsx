import { FrontPoster } from "@/components/poster/front-poster";
import { POSTER_SIZES } from "@/components/poster/band-poster";
import { coercePosterValues } from "@/components/poster/poster-builder";

type Search = { utgafa?: string; snid?: string; thema?: string };

/** Bare, full-size front poster for headless capture (/api/plakat drives this). */
export default function RawFrontPosterPage({ searchParams }: { searchParams: Search }) {
  const { variant, format, theme } = coercePosterValues(searchParams, "typo");
  const size = POSTER_SIZES[format];

  return (
    <>
      <style>{`body.grain::before{display:none!important}body{margin:0!important;overflow:hidden!important;background:transparent!important}`}</style>
      <div style={{ width: size.w, height: size.h }}>
        <FrontPoster variant={variant} format={format} theme={theme} />
      </div>
    </>
  );
}
