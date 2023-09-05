import GuidePage from "./GuidePage";
import { refVersions } from "consts";
import { getAllDocLinks, getGuideContent } from "api/doc/guides";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allParams: { version: string; slug: string }[] = [];

  for await (const version of refVersions) {
    const guideLinks = await getAllDocLinks(`guides/${version}`);
    guideLinks.forEach((guideLink) => {
      allParams.push({
        version: `v${version}`,
        slug: guideLink.slug,
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
    version = version.substring(1);
    const mdxContent = await getGuideContent(slug, version);
    return (
      <GuidePage
        Mdx={mdxContent.default}
        title={mdxContent.name}
        executable={mdxContent.executable}
        slug={slug}
        tags={mdxContent.tags?.split(",")}
        version={version}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
