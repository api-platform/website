import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GuideFrontMatter } from "types";
import { extractHeadingsFromMarkdown, sortByPosition } from "utils";

export async function getAllDocLinks(
  folder: string,
  outputFolder?: string,
  extname = ".mdx"
) {
  const directory = `data/docs/${folder}`;
  const files = (
    await fs.readdirSync(path.join(process.cwd(), directory))
  ).filter((file) => path.extname(file) === extname);

  const links = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(process.cwd(), directory, file);
      const fileContents = await fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        ...matterResult.data,
        position: matterResult.data.position || 9999,
        name:
          matterResult.data.name ||
          extractHeadingsFromMarkdown(matterResult.content, 1)?.[0],
        slug: matterResult.data.slug || path.parse(file).name,
      } as GuideFrontMatter;
    })
  );

  const sortedLinks = links.sort(sortByPosition).map((link) => ({
    title: link.name,
    link: `/docs/${outputFolder || folder}/${link.slug}`,
    slug: link.slug,
  }));

  return sortedLinks;
}

export async function getGuideContent(slug: string) {
  const resultMdx = await import(`data/docs/guides/${slug}.mdx`);
  return resultMdx;
}