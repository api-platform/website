import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { getAllReferenceSlugs } from "api/doc/references";

export async function generateStaticParams() {
  const slugs = await getAllReferenceSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}
export const dynamicParams = false;

export default async function Page({
  params: { slug, version },
}: {
  params: {
    slug: string[];
    version: string;
  };
}) {
  const { default: Mdx, type } = await loadMarkdownBySlugArray([
    "reference",
    ...slug,
  ]);
  return <DocPage Mdx={Mdx} type={type} slug={slug} version={version} />;
}
