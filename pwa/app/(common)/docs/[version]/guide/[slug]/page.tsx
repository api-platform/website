import GuidePage from "./GuidePage";
import { versions } from "consts";
import { getAllDocLinks, getGuideContent } from "api/doc/guides";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string }[] = [];
  await Promise.all(
    // todo : ne pas mapper sur toutes les versions mais seulement celles compatibles avec les guides
    versions.map(async (version) => {
      const guideLinks = await getAllDocLinks("guides"); // todo: appel versionné
      guideLinks.map((guideLink) => {
        allParams.push({
          version: `v${version}`,
          slug: guideLink.slug,
        });
      });
    })
  );
  return allParams;
}

export const dynamicParams = false;

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const mdxContent = await getGuideContent(slug);
    return (
      <GuidePage
        Mdx={mdxContent.default}
        title={mdxContent.name}
        slug={slug}
        tags={mdxContent.tags?.split(",")}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
