import { getConferenceData } from "api/con/conferences";
import DefaultTags from "app/(con)/[locale]/con/DefaultTags";
export default async function Head({
  params,
}: {
  params: {
    edition: string;
    slug: string;
  };
}) {
  const meta = (await import(`data/con/${params.edition}/meta`)).default;
  const conference = await getConferenceData(params.edition, params.slug);

  return (
    <DefaultTags
      meta={{
        ...meta,
        TITLE: `${conference.title} - ${meta.TITLE}`,
        DESCRIPTION: conference.short,
      }}
    />
  );
}
