import { getLegalData } from "api/con/legal";
import DefaultTags from "app/(con)/[locale]/con/DefaultTags";
export default async function Head({
  params,
}: {
  params: {
    edition: string;
    legal: string;
  };
}) {
  const meta = (await import(`data/con/${params.edition}/meta`)).default;
  const legalData = await getLegalData(params.edition, params.legal);

  return (
    <DefaultTags
      meta={{ ...meta, TITLE: `${legalData.title} - ${meta.TITLE}` }}
    />
  );
}
