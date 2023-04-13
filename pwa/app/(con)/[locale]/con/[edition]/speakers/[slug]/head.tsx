import { getSpeakerData } from "api/con/speakers";
import DefaultTags from "app/(con)/[locale]/con/DefaultTags";
export default async function Head({
  params,
}: {
  params: {
    edition: string;
    slug: string;
    locale: string;
  };
}) {
  const meta = (await import(`data/con/${params.edition}/meta`)).default;
  const speaker = await getSpeakerData(
    params.edition,
    params.slug,
    params.locale
  );

  return (
    <DefaultTags
      meta={{
        ...meta,
        TITLE: `${speaker.name} - ${meta.TITLE}`,
        DESCRIPTION: `Discover the profile of ${meta.name}, speaker at the API Plaform Conference ${params.edition}`,
      }}
    />
  );
}
