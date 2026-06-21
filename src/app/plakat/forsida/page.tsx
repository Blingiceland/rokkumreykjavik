import { FrontPoster } from "@/components/poster/front-poster";
import { PORTRAIT_FORMATS, LANDSCAPE_FORMATS } from "@/components/poster/band-poster";
import { PosterBuilder, PosterPreview, coercePosterValues } from "@/components/poster/poster-builder";

type Search = { utgafa?: string; snid?: string; thema?: string };

export default function FrontPosterPage({ searchParams }: { searchParams: Search }) {
  const values = coercePosterValues(searchParams, "typo");

  return (
    <PosterBuilder
      title="Plakat — Forsíða"
      subtitle="Öll hátíðin á einu plakati — fjórir dagar, öll böndin."
      values={values}
      variantLabels={{ typo: "Dagskrá", klassik: "Öll böndin", mynd: "Mynda-grid" }}
      formats={[...PORTRAIT_FORMATS, ...LANDSCAPE_FORMATS]}
      downloadBase="/api/plakat?kind=forsida&id=forsida"
      shareNote="Aðalplakat hátíðarinnar. Breiðu FB-sniðin (1.91:1 / 16:9) eru fyrir viðburðar- og síðu-forsíður — láréttu útgáfuna óháð valinni útgáfu."
      preview={
        <PosterPreview format={values.format}>
          <FrontPoster variant={values.variant} format={values.format} theme={values.theme} />
        </PosterPreview>
      }
    />
  );
}
