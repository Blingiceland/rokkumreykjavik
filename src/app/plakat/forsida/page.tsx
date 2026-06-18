import { FrontPoster } from "@/components/poster/front-poster";
import { PosterBuilder, PosterPreview, coercePosterValues } from "@/components/poster/poster-builder";

type Search = { utgafa?: string; snid?: string; thema?: string };

export default function FrontPosterPage({ searchParams }: { searchParams: Search }) {
  const values = coercePosterValues(searchParams, "typo");

  return (
    <PosterBuilder
      title="Plakat — Forsíða"
      subtitle="Öll hátíðin á einu plakati — fjórir dagar, öll böndin."
      values={values}
      downloadBase="/api/plakat?kind=forsida&id=forsida"
      shareNote="Aðalplakat hátíðarinnar — deildu því hvar sem er."
      preview={
        <PosterPreview format={values.format}>
          <FrontPoster variant={values.variant} format={values.format} theme={values.theme} />
        </PosterPreview>
      }
    />
  );
}
