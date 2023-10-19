import { readFile } from "node:fs/promises";
import { Stream } from "node:stream";
import { existsSync, createReadStream, ReadStream } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractTitleFromMarkdown, slugify } from "utils";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import YAML from "yaml";
import MarkdownIt from "markdown-it";
import { current } from "consts";
import { Chapters } from "types";
import { highlightCode } from "utils/highlighter";

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
      return url.replace("index.mdx", "").replace(".mdx", "");
    }

    return path
      .normalize(
        `/docs/${
          !version || version === current ? "" : `v${version}`
        }/${path.dirname(githubPath)}/${url}`
      )
      .replace("index.mdx", "")
      .replace(".mdx", "");
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
    name: mdx.name || extractTitleFromMarkdown(matterResult.content),
    type: matterResult.data.type,
  };
}

export async function getMarkdownStreamTitle(version: string, slug: string[]) {
  const key = `${version}/${slug.join("")}`;
  if (sidebarMemoryCache.has(key)) {
    return sidebarMemoryCache.get(key);
  }

  const stream = createSlugReadStream(version, slug);
  let title: string;

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      title =
        extractTitleFromMarkdown(chunk.toString()) ||
        slug[slug.length - 1] ||
        "";

      if (title) {
        sidebarMemoryCache.set(key, title);
        resolve(title);
        stream.destroy();
      }
    });
    stream.on("error", (err) => reject(err));
  });
}

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

export async function getDocContentFromSlug(version: string, slug: string[]) {
  slug = slug.filter((v) => v);
  const lastPart = slug.slice(-1)[0];
  const p = slug.join("/") + (indexes.includes(lastPart) ? "/index.mdx" : ".mdx");

  try {
    const buffer = await readFile(`data/docs/${version}/${p}`, "utf8");

    return { data: buffer.toString(), path: p };
  } catch (error) {
    console.error(`An error occured while fetching ${p}`);
    console.error(error);
    throw error;
  }
}

export function getGithubPath(slug: string[]): string {
  slug = slug.filter((v) => v);
  const lastPart = slug.slice(-1)[0];
  return slug.join("/") + (indexes.includes(lastPart) ? "/index.mdx" : ".mdx");
}

export function createSlugReadStream(
  version: string,
  slug: string[]
): ReadStream {
  const filePath = path.join("data/docs/", version, getGithubPath(slug));
  if (existsSync(filePath)) {
    return createReadStream(filePath);
  }

  throw new Error(`File ${filePath} not found.`);
}

const codeInside = /\[codeSelector\]([\s\S]+?)(?=\[\/codeSelector])/gm;
const codeBlockRegex = /```[a-z]([\s\S]+?)(?=```)/gm;
const codeLanguage = /```([a-z]+)/;
const absoluteImgRegex = /src="\/docs\/(.*?\.(jpg|jpeg|png|gif|svg))"/gm;
const blankLinkRegex =
  /<a\s+([^>]*\s+)?href="http[^"]*"(?![^>]*\starget=[^>]*>)/gm;
const imgRegex = /<img([^>]*)src="([^"]+)"([^>]*)>/g;
const linkRegex = /<a([^>]*)href="([^"]+)"([^>]*)>/g;

const headingRegex = /<h([2-4])>(.*?)<\/h\1>/gm;

function getLang(block: string): string {
  const language = block.match(codeLanguage);

  if (!language?.length) {
    return "text";
  }

  return language[1];
}

export function streamToString(stream: Stream) {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export function getHtmlFromGithubContent(
  data: any,
  githubPath: string,
  version: string
) {
  const result = data;

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  md.options.highlight = highlightCode;

  // convert code selectors
  const transformCodeSelectors = (markdown: string) => {
    const matches = markdown.match(codeInside);

    if (!matches?.length) {
      return markdown;
    }

    matches.forEach((m: string) => {
      const blocks = m.match(codeBlockRegex);

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
        const h = md.render(block + `\n\`\`\``);
        html += `<div key="${l}" class="p-4 ${
          i > 0 ? "hidden" : ""
        }">${h}</div>`;
      });

      html += "</div>";
      markdown = markdown.replace(m, html);
    });

    return markdown.replaceAll("[/codeSelector]", "");
  };

  // convert indented code block to classic code blocks with backticks
  const convertIndentedBlocCode = (str: string) => {
    const codeBlockWithoutLangRegex =
      /(^|\n)((?:\s{4}.*\n)+)(\n|$)(?!(^|\n)```)/g;

    // Structure intermédiaire pour stocker les blocs de code
    const blocsCode: string[] = [];

    // Remplacer les blocs de code classiques par un marqueur et les stocker
    const texteSansBlocsCode = str.replace(codeBlockRegex, (match: string) => {
      blocsCode.push(match);
      return `***BLOC_CODE_${blocsCode.length - 1}***`;
    });

    const texteAvecLignesModifiees = texteSansBlocsCode
      .replace(codeBlockWithoutLangRegex, "\n```\n$2\n```\n")
      .replace(/^(?: {4})/gm, "");

    // Réintégrer les blocs de code classiques au bon endroit
    const resultat = texteAvecLignesModifiees.replace(
      /\*\*\*BLOC_CODE_(\d+)\*\*\*/g,
      (match, index) => {
        return blocsCode[index];
      }
    );

    return resultat;
  };

  const transformedMarkdown = convertIndentedBlocCode(
    transformCodeSelectors(result)
  );

  return md
    .render(transformedMarkdown)
    .replace(
      imgRegex,
      (_match: string, p1: string, srcValue: string, p3: string) =>
        `<img${p1}src="${toAbsoluteUrl(srcValue, githubPath)}"${p3}>`
    )
    .replace(
      absoluteImgRegex,
      `src="https://raw.githubusercontent.com/api-platform/docs/${version}/$1"`
    )
    .replace(
      linkRegex,
      (_match: string, p1: string, srcValue: string, p3: string) =>
        `<a${p1}href="${toAbsoluteUrl(srcValue, githubPath, version)}"${p3}>`
    )
    .replace(headingRegex, (_match: string, p1: string, p2: string) => {
      const slug = slugify(p2);
      return `<h${p1} class="group">${p2} <a id=${slug} class="opacity-0 group-hover:opacity-100" style="
    padding-top: 80px;
    margin-top: -80px;
" href=#${slug}>#</a></h${p1}>`;
    })
    .replace(blankLinkRegex, '$& target="_blank"');
}
