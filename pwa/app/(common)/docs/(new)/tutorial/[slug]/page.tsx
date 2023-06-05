import DocPage from "./DocPage";
import { loadMarkdownBySlugArray } from "api/doc";
import { getAllDocLinks } from "api/doc/guides";

export async function generateStaticParams() {
  const tutorialLinks = (await getAllDocLinks("tutorial")).map((link) =>
    link.link.replace("/docs/tutorial/", "")
  );
  console.log(tutorialLinks);
  return tutorialLinks.map((slug) => ({
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
    "tutorial",
    slug,
  ]);
  return <DocPage Mdx={Mdx} title={name} />;
}
