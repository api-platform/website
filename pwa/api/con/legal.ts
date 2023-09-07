import path from "node:path";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import { extractTitleFromMarkdown } from "utils";
import { Locale, i18n } from "i18n/i18n-config";
import MarkdownIt from "markdown-it";

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
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const contentHtml = md.render(matterResult.content);
  // Combine the data with the id and contentHtml
  return {
    content: contentHtml
      .replace(/href="#/g, `href="/con/${edition}#`)
      .replace(/href="\/\//g, 'href="/'),
    title: extractTitleFromMarkdown(matterResult.content) || "",
  };
};

export const getAllLegalSlugs = async (edition = "2022") => {
  return (
    await Promise.all(
      i18n.locales.map(async (locale) => {
        const s = (
          await readdir(
            path.join(process.cwd(), `data/con/${edition}/legal/${locale}`)
          )
        )
          .filter((el) => path.extname(el) === ".md")
          .map((slug: string) => slug.replace(/\.md$/, ""));
        return s;
      })
    )
  ).flat();
};
