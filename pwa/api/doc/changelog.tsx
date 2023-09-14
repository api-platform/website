import { readFile, readdir } from "node:fs/promises";

import path from "node:path";
import matter from "gray-matter";
import { DocLink } from "types";
import { current } from "consts";

export async function getAllChangelogLinks(version = current) {
  const directory = `data/docs/changelog`;
  const files = (await readdir(path.join(process.cwd(), directory))).filter(
    (file) => path.extname(file) === ".mdx"
  );

  const links = await files.reduce(async (acc, file) => {
    const fullPath = path.join(process.cwd(), directory, file);
    const fileContents = await readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return [
      {
        ...matterResult.data,
      } as DocLink,
    ];
  }, Promise.resolve([]) as Promise<DocLink[]>);

  return links.map((link) => ({
    link:
      version === current ? `/docs/changelog` : `/docs/v${version}/changelog`,
  }));
}
