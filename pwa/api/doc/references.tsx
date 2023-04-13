import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DocReferenceLink } from "types";
import { sortByTitle } from "utils";

export async function getLinksFromFolder(
  directory: string,
  summary: Record<string, DocReferenceLink[]>
) {
  const files = (await fs.readdirSync(directory)).filter(
    (file) => path.extname(file) !== ".md"
  );
  await Promise.all(
    files.map(async (file) => {
      let fullPath = `${directory}/${file}`;
      const s = fs.statSync(fullPath);
      if (s.isDirectory()) await getLinksFromFolder(fullPath, summary);
      else {
        const fileContents = await fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        fullPath = fullPath.replace(".mdx", "");
        const item = {
          title: path.basename(fullPath),
          link: fullPath.replace("data/docs", "/docs"),
          type: matterResult.data.type,
        };
        const basePath = directory.replace("data/docs/reference/", "");
        if (summary[basePath]) summary[basePath].push(item);
        else summary[basePath] = [item];
      }
    })
  );
}

export async function getReferencesSummary() {
  const summary: Record<string, DocReferenceLink[]> = {};
  await getLinksFromFolder("data/docs/reference", summary);

  return Object.keys(summary)
    .map((k) => ({
      title: k,
      links: summary[k].sort(sortByTitle),
    }))
    .sort(sortByTitle);
}

export async function getAllReferenceSlugs() {
  const summary = await getReferencesSummary();
  const allSlugs = summary
    .map((summaryPart) => summaryPart.links)
    .flat()
    .map((link) => link.link.replace("/docs/reference/", ""));
  return allSlugs;
}
