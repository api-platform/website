import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { getAllDocLinks } from "api/doc/guides";

export async function generateStaticParams() {
  const inDepthLinks = (await getAllDocLinks("in-depth")).map((link) =>
    link.link.replace("/docs/in-depth/", "")
  );
  return inDepthLinks.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const { default: Mdx, name } = await loadMarkdownBySlugArray([
    "in-depth",
    slug,
  ]);
  return <DocPage Mdx={Mdx} title={name} />;
}
