import { current, versions } from "consts";
import { notFound } from "next/navigation";
import {
  getAllChangelogLinks,
} from "../../../../../api/doc/changelog";
import ChangelogPage from "app/common/docs/[version]/changelog/ChangelogPage";
import { loadMarkdownBySlugArray } from "../../../../../api/doc";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string }[] = [];

  for await (const version of versions) {
    const changelogLinks = await getAllChangelogLinks(version);
    changelogLinks.forEach((changelogLink) => {
      allParams.push({
        version: `v${version}`,
        slug: changelogLink.slug,
      });
    });
  }

  return allParams;
}

export const dynamicParams = false;

export default async function Page({
  params: { slug, version },
}: {
  params: {
    slug: string;
    version: string;
  };
}) {
  try {
    const v = versions.includes(version.substring(1))
      ? version.substring(1)
      : current;

    const { default: Mdx } = await loadMarkdownBySlugArray(["changelog", v]);

    return <ChangelogPage Mdx={Mdx} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
