import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { getAllDocLinks } from "api/doc/guides";

export async function generateStaticParams() {
  const tutorialLinks = (await getAllDocLinks("tutorial")).map((link) =>
    link.link.replace("/docs/", "")
  );
  const inDepthLinks = (await getAllDocLinks("in-depth")).map((link) =>
    link.link.replace("/docs/", "")
  );
  return [...tutorialLinks, ...inDepthLinks].map((slug) => ({
    slug: slug.split("/"),
  }));
}

export const dynamicParams = false;

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {
  const { default: Mdx, name } = await loadMarkdownBySlugArray(slug);
  return <DocPage Mdx={Mdx} slug={slug} title={name} />;
}
