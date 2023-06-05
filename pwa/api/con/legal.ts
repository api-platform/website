import path from "node:path";
import { readFile, readdir } from "node:fs/promises";

import matter from "gray-matter";
import { marked } from "marked";
import { extractHeadingsFromMarkdown } from "utils";
import { Locale } from "i18n/i18n-config";

export const getLegalData = async (
  edition: string,
  slug: string,
  locale: Locale
) => {
  const fileContents = await readFile(
    path.join(process.cwd(), `data/con/${edition}/legal/${locale}/${slug}.md`),
    "utf8"
  );

  const matterResult = matter(fileContents);

  const processedContent = await marked(matterResult.content, { async: true });

  const contentHtml = processedContent?.toString();
  // Combine the data with the id and contentHtml
  return {
    content: contentHtml
      .replace(/href="#/g, `href="/con/${edition}#`)
      .replace(/href="\/\//g, 'href="/'),
    title: extractHeadingsFromMarkdown(matterResult.content, 1)?.[0] || "",
  };
};

export const getAllLegalSlugs = async (edition = "2022") => {
  const slugs = (
    await readdir(path.join(process.cwd(), `data/con/${edition}/legal`))
  )
    .filter((el) => path.extname(el) === ".md")
    .map((slug: string) => slug.replace(/\.md$/, ""));
  return slugs;
};
