import GuidePage from "./GuidePage";
import { getAllDocLinks, getGuideContent } from "api/doc/guides";

export async function generateStaticParams() {
  const guideLinks = await getAllDocLinks("guides");
  return guideLinks.map((guideLink) => ({ slug: guideLink.slug }));
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
    const mdxContent = await getGuideContent(slug);
    return (
      <GuidePage
        Mdx={mdxContent.default}
        title={mdxContent.name}
        tags={mdxContent.tags?.split(",")}
      />
    );
  } catch {
    return <div>Error during loading page content</div>;
  }
}
