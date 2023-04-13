import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "fs";
import { extractHeadingsFromMarkdown } from "utils";

export const getLegalData = async (edition: string, slug: string) => {
  const fileContents = await fs.readFileSync(
    path.join(process.cwd(), `data/con/${edition}/legal/${slug}.md`),
    "utf8"
  );

  const matterResult = matter(fileContents);

  const processedContent = await marked(matterResult.content);

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
  const slugs = await fs
    .readdirSync(path.join(process.cwd(), `data/con/${edition}/legal`))
    .filter((el) => path.extname(el) === ".md")
    .map((slug: string) => slug.replace(/\.md$/, ""));
  return slugs;
};
