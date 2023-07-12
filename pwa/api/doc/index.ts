import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadingsFromMarkdown, slugify } from "utils";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { markedHighlight } from "marked-highlight";
import { Lang, getHighlighter } from "shiki";
import YAML from "yaml";
import { marked } from "marked";
import { cache } from "react";
import { current } from "consts";
import { load as parseHtml } from "cheerio";
import { Chapters } from "types";

export const MyOctokit = Octokit.plugin(throttling);
const sidebarMemoryCache = new Map();

function toAbsoluteUrl(
  url: string,
  githubPath: string,
  version?: string
): string {
  try {
    new URL(url);
    return url;
  } catch (err) {
    if (path.isAbsolute(url)) {
      return url.replace("index.md", "").replace(".md", "");
    }

    return path
      .normalize(
        `/docs/${
          !version || version === current ? "" : `v${version}`
        }/${path.dirname(githubPath)}/${url}`
      )
      .replace("index.md", "")
      .replace(".md", "");
  }
}

export async function loadMarkdownBySlugArray(slug: string[]) {
  const mdx = await import(`data/docs/${slug.join("/")}.mdx`);

  const fileContents = await readFile(
    path.join(process.cwd(), `/data/docs/${slug.join("/")}.mdx`),
    "utf-8"
  );
  const matterResult = matter(fileContents);

  return {
    ...mdx,
    name: mdx.name || extractHeadingsFromMarkdown(matterResult.content, 1)?.[0],
  };
}

export const getDocTitle = async (version: string, slug: string[]) => {
  try {
    const key = slug.join("");
    if (sidebarMemoryCache.has(key)) {
      return sidebarMemoryCache.get(key);
    }
    const { data } = await getDocContentFromSlug(version, slug);
    const title = extractHeadingsFromMarkdown(data, 1)?.[0];

    sidebarMemoryCache.set(key, title || slug.shift());
    return sidebarMemoryCache.get(key);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const loadV2DocumentationNav = cache(async (branch: string) => {
  try {
    const url = `https://raw.githubusercontent.com/api-platform/docs/${branch}/outline.yaml`;
    const response = await fetch(url);
    //return [];
    const data = await response.text();
    const navData: Chapters = YAML.parse(data);

    const basePath = branch === current ? `/docs` : `/docs/v${branch}`;
    return Promise.all(
      navData.chapters.map(async (part) => ({
        title: part.title,
        basePath: `${basePath}/${part.path}`,
        links: await Promise.all(
          part.items.map(async (item: string) => ({
            title: await getDocTitle(branch, [
              part.path,
              item === "index" ? "" : item,
            ]),
            link:
              item === "index"
                ? `${basePath}/${part.path}/`
                : `${basePath}/${part.path}/${item}`,
          }))
        ),
      }))
    );
  } catch (error) {
    console.error(error);
  }
  return [];
});

const indexes = [
  "admin",
  "core",
  "create-client",
  "deployment",
  "distribution",
  "extra",
  "schema-generator",
  "client-generator",
];
export const getDocContentFromSlug = async (
  version: string,
  slug: string[]
) => {
  slug = slug.filter((v) => v);
  const lastPart = slug.slice(-1)[0];
  const p = slug.join("/") + (indexes.includes(lastPart) ? "/index.md" : ".md");

  try {
    const url = `https://raw.githubusercontent.com/api-platform/docs/${version}/${p}`;
    const response = await fetch(url);
    const data = await response.text();

    return { data, path: p };
  } catch (error) {
    console.error(`An error occured while fetching ${p}`);
    console.error(error);
    throw error;
  }
};

const codeInside = /\[codeSelector\]([\s\S]+?)(?=\[\/codeSelector])/gm;
const codeBlock = /```[a-z]([\s\S]+?)(?=```)/gm;
const codeLanguage = /```([a-z]+)/;
const absoluteImgRegex = /src="\/docs\/(.*?\.(jpg|jpeg|png|gif|svg))"/gm;
const blankLinkRegex =
  /<a\s+([^>]*\s+)?href="http[^"]*"(?![^>]*\starget=[^>]*>)/gm;

const headingRegex = /<h([2-4])>(.*?)<\/h\1>/gm;

function getLang(block: string): string {
  const language = block.match(codeLanguage);

  if (!language?.length) {
    return "text";
  }

  return language[1];
}

export const getHtmlFromGithubContent = async (
  data: any,
  githubPath: string,
  version: string
) => {
  const result = data;

  marked.setOptions({ mangle: false, headerIds: false });

  const highlighter = await getHighlighter({
    themes: ["github-light", "one-dark-pro"],
  });
  const languages = highlighter.getLoadedLanguages();

  marked.use(
    markedHighlight({
      langPrefix: "not-prose language-",
      highlight(code, language) {
        if (code.includes('class="shiki')) return code; // ugly but fix https://github.com/markedjs/marked-highlight/issues/26

        language = language.toLowerCase();
        const langExists = languages.includes(language as Lang);
        const lang = langExists ? language : "shell";

        return (
          highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }) +
          highlighter.codeToHtml(code, { lang, theme: "github-light" })
        );
      },
    })
  );

  // Links transformation, we use trailingSlash: true, and links skip the ".md" part
  // this allows the doc to work on github and on our nextjs website
  marked.use({
    walkTokens: (token: any) => {
      if (!["link", "image", "html"].includes(token.type)) {
        return;
      }

      if (token.type === "html") {
        const $ = parseHtml(token.raw);
        $("a").map(function (i, elem) {
          const el = $(this);
          const href = el.attr("href");

          if (href) {
            el.attr("href", toAbsoluteUrl(href, githubPath, version));
          }

          return el;
        });

        $("img").map(function (i, elem) {
          const el = $(this);
          const src = el.attr("src");
          if (src) {
            el.attr("src", toAbsoluteUrl(src, githubPath));
          }

          return el;
        });

        token.text = $.html();
        return;
      }
      token.href = toAbsoluteUrl(
        token.href,
        githubPath,
        token.type === "link" ? version : undefined
      );
    },
  });

  marked.use({
    hooks: {
      preprocess: (markdown: any) => {
        const matches = markdown.match(codeInside);

        if (!matches?.length) {
          return markdown;
        }

        matches.forEach((m: string) => {
          const blocks = m.match(codeBlock);

          if (!blocks) {
            return;
          }

          let html = `
<div class="mb-4 overflow-hidden rounded-2xl bg-gray-100 dark:bg-blue-darkest not-prose">
  <div class="flex flex-wrap -mb-px bg-gray-300/10 dark:bg-blue/20 border-b border-gray-300 dark:border-blue-dark">
`;

          blocks.forEach((block: string, i: number) => {
            const l = getLang(block);
            html += `<div><a key="${l}" onclick="switchCode(event)" role="button" class="inline-block py-2 px-6 border-b-2 font-semibold text-sm uppercase hover:bg-blue-black/5 dark:hover:bg-blue-black/30 transition-all ${
              i === 0
                ? "text-blue dark:text-white border-blue bg-blue-black/5 dark:bg-blue-black/30"
                : "text-gray-400 dark:text-blue/60 border-transparent"
            }">${l}</a></div>`;
          });

          html += "</div>";

          blocks.forEach((block: string, i: number) => {
            const l = getLang(block);
            const h = marked.parse(block + `\n\`\`\``);
            html += `<div key="${l}" class="p-4 ${
              i > 0 ? "hidden" : ""
            }">${h}</div>`;
          });

          html += "</div>";
          markdown = markdown.replace(m, html);
        });

        return markdown.replaceAll("[/codeSelector]", "");
      },
    },
  });

  return marked
    .parse(result)
    .replace(
      absoluteImgRegex,
      `src="https://raw.githubusercontent.com/api-platform/docs/${version}/$1"`
    )
    .replace(headingRegex, (match, p1, p2) => {
      const slug = slugify(p2);
      return `<h${p1} class="group">${p2} <a id=${slug} class="opacity-0 group-hover:opacity-100" style="
    padding-top: 80px;
    margin-top: -80px;
" href=#${slug}>#</a></h${p1}>`;
    })
    .replace(blankLinkRegex, '$& target="_blank"');
};
