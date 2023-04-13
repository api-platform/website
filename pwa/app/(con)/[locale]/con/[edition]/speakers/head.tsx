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
        TITLE: `The speakers - ${meta.TITLE}`,
      }}
    />
  );
}
