import { readFile, readdir } from "node:fs/promises";

import path from "node:path";
import matter from "gray-matter";
import { GuideFrontMatter } from "types";
import { extractTitleFromMarkdown, sortByPosition } from "utils";
import { current } from "consts";

export async function getAllDocLinks(
  folder: string,
  outputFolder?: string,
  extname = ".mdx",
  version = current
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
        position: matterResult.data.position === undefined ? 9999 : parseInt(matterResult.data.position, 10),
        name:
          matterResult.data.name ||
          extractTitleFromMarkdown(matterResult.content),
        slug: matterResult.data.slug || path.parse(file).name,
        tags: matterResult.data.tags?.split(", ") || [""],
      } as GuideFrontMatter,
    ];
  }, Promise.resolve([]) as Promise<GuideFrontMatter[]>);

  return links.sort(sortByPosition).map((link) => ({
    title: link.name,
    link:
      version === current
        ? `/docs/${outputFolder || folder}/${link.slug}`
        : `/docs/v${version}/${outputFolder || folder}/${link.slug}`,
    slug: link.slug,
    tags: link.tags,
  }));
}

export async function getGuideContent(slug: string, version = current) {
  const [fileContents, mdx] = await Promise.all([
    readFile(`data/docs/guides/${version}/${slug}.mdx`, "utf8"),
    import(`data/docs/guides/${version}/${slug}.mdx`),
  ]);
  const { data } = matter(fileContents);

  return {
    default: mdx.default,
    executable: data.executable,
    tags: data.tags,
    name: data.name,
  };
}

export async function getGuidesTags(version = current) {
  const directory = `data/docs/guides/${version}`;
  const files = await readdir(path.join(process.cwd(), directory));

  const tags = await files.reduce(async (acc, file) => {
    const fullPath = path.join(process.cwd(), directory, file);
    const fileContents = await readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return [
      {
        tags: matterResult.data.tags || [],
      } as GuideFrontMatter,
    ];
  }, Promise.resolve([]) as Promise<GuideFrontMatter[]>);

  if (!tags) {
    return [];
  }

  return tags.map((link) => link.tags).flat();
}
