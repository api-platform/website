import DefaultTags from "app/(con)/[locale]/con/DefaultTags";
export default async function Head({
  params,
}: {
  params: {
    edition: string;
  };
}) {
  const meta = (await import(`data/con/${params.edition}/meta`)).default;

  return (
    <DefaultTags
      meta={{
        ...meta,
        TITLE: `The schedule - ${meta.TITLE}`,
        DESCRIPTION: `Discover the lineup of the API Plaform Conference ${params.edition}`,
      }}
    />
  );
}
