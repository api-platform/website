import { readFile, readdir } from "node:fs/promises";

import path from "node:path";
import matter from "gray-matter";
import { GuideFrontMatter } from "types";
import { extractHeadingsFromMarkdown, sortByPosition } from "utils";

export async function getAllDocLinks(
  folder: string,
  outputFolder?: string,
  extname = ".mdx"
) {
  const directory = `data/docs/${folder}`;
  const files = (await readdir(path.join(process.cwd(), directory))).filter(
    (file) => path.extname(file) === extname
  );

  const links = await files.reduce(async (acc, file) => {
    const awaitedAcc = await acc;
    const fullPath = path.join(process.cwd(), directory, file);
    const fileContents = await readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return [
      ...awaitedAcc,
      {
        ...matterResult.data,
        position: matterResult.data.position || 9999,
        name:
          matterResult.data.name ||
          extractHeadingsFromMarkdown(matterResult.content, 1)?.[0],
        slug: matterResult.data.slug || path.parse(file).name,
      } as GuideFrontMatter,
    ];
  }, Promise.resolve([]) as Promise<GuideFrontMatter[]>);

  return links.sort(sortByPosition).map((link) => ({
    title: link.name,
    link: `/docs/${outputFolder || folder}/${link.slug}`,
    slug: link.slug,
  }));
}

export async function getGuideContent(slug: string) {
  const [fileContents, mdx] = await Promise.all([
    readFile(`data/docs/guides/${slug}.mdx`, "utf8"),
    import(`data/docs/guides/${slug}.mdx`),
  ]);
  const { data } = matter(fileContents);

  return {
    default: mdx.default,
    tags: data.tags,
    name: data.name,
  };
}
