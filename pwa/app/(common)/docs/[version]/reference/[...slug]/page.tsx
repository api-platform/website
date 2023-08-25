import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { versions } from "consts";
import { getAllReferenceSlugs } from "api/doc/references";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string[] }[] = [];
  await Promise.all(
    // todo : ne pas mapper sur toutes les versions mais seulement celles compatibles avec les references
    versions.map(async (version) => {
      const slugs = await getAllReferenceSlugs(); // todo: appel versionné
      slugs.map((slug) => {
        allParams.push({
          version: `v${version}`,
          slug: slug.split("/"),
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
    slug: string[];
  };
}) {
  const { default: Mdx, type } = await loadMarkdownBySlugArray([
    "reference",
    ...slug,
  ]);
  return <DocPage Mdx={Mdx} type={type} slug={slug} />;
}
