import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { getAllReferenceSlugs } from "api/doc/references";
import { getVersionAndSlugFromSlugs } from "../../../../../utils";

export async function generateStaticParams() {
  const slugs = await getAllReferenceSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}
export const dynamicParams = false;

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {
  const { version: v, slugs: s } = getVersionAndSlugFromSlugs(slug);
  const { default: Mdx, type } = await loadMarkdownBySlugArray([
    "reference",
    ...s,
  ]);

  return <DocPage Mdx={Mdx} type={type} slug={slug} version={v} />;
}
