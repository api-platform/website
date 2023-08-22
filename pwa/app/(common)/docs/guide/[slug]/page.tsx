import GuidePage from "./GuidePage";
import { getAllDocLinks, getGuideContent } from "api/doc/guides";
import { getVersionAndSlugFromSlugs } from "../../../../../utils";

export async function generateStaticParams() {
  const guideLinks = await getAllDocLinks("guides");
  return guideLinks.map((guideLink) => ({
    slug: guideLink.slug,
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
  try {
    const slugs = slug.split("/");
    const { version: version } = getVersionAndSlugFromSlugs(slugs);
    const mdxContent = await getGuideContent(slug, version);

    return (
      <GuidePage
        Mdx={mdxContent.default}
        title={mdxContent.name}
        slug={slug}
        version={version}
        tags={mdxContent.tags?.split(",")}
      />
    );
  } catch (error) {
    return <div>Error during loading page content</div>;
  }
}
