import { readFile, readdir } from "node:fs/promises";

import path from "node:path";
import matter from "gray-matter";
import { GuideFrontMatter } from "types";
import { extractTitleFromMarkdown, sortByPosition } from "utils";
import { current } from "consts";

export async function getAllChangelogLinks(version = current) {
  const directory = `data/docs/changelog`;
  const files = (await readdir(path.join(process.cwd(), directory))).filter(
    (file) => path.extname(file) === ".mdx"
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
        position: matterResult.data.position === undefined ? 9999 : parseInt(matterResult.data.position, 10),
        name:
          matterResult.data.name ||
          extractTitleFromMarkdown(matterResult.content),
        slug: matterResult.data.slug || path.parse(file).name,
      } as GuideFrontMatter,
    ];
  }, Promise.resolve([]) as Promise<GuideFrontMatter[]>);

  return links.sort(sortByPosition).map((link) => ({
    title: link.name,
    link:
      version === current
        ? `/docs/changelog/${link.slug}`
        : `/docs/v${version}/changelog/${link.slug}`,
    slug: link.slug,
  }));
}
