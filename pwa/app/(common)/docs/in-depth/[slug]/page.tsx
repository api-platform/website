import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { readdir } from "node:fs/promises";
import path from "node:path";

export async function generateStaticParams() {
  const directory = `data/docs/in-depth`;

  return (await readdir(path.join(process.cwd(), directory))).map((link) => ({
    slug: link.replace(".mdx", ""),
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
