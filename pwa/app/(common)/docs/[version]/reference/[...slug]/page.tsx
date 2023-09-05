import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { current, refVersions, versions } from "consts";
import { getAllReferenceSlugs } from "api/doc/references";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string[] }[] = [];

  for await (const version of refVersions) {
    const slugs = await getAllReferenceSlugs(version);
    slugs.forEach((slug) => {
      allParams.push({
        version: `v${version}`,
        slug: slug.split("/"),
      });
    });
  }

  return allParams;
}

//export const dynamicParams = false;

export default async function Page({
  params: { slug, version },
}: {
  params: {
    slug: string[];
    version: string;
  };
}) {
  const v = versions.includes(version.substring(1))
    ? version.substring(1)
    : current;

  const { default: Mdx, type } = await loadMarkdownBySlugArray([
    "reference",
    v,
    ...slug,
  ]);
  return <DocPage Mdx={Mdx} type={type} slug={slug} />;
}
