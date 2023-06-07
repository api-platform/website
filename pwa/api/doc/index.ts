import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadingsFromMarkdown } from "utils";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { markedHighlight } from "marked-highlight";
import { Lang, getHighlighter } from "shiki";
import YAML from "yaml";
import { marked } from "marked";
import { cache } from "react";
import { current } from "consts";
import { load as parseHtml } from 'cheerio';

export const MyOctokit = Octokit.plugin(throttling);
const sidebarMemoryCache = new Map()

type Options = {
  method?: string;
  url?: string;
};

function toAbsoluteUrl(url: string, githubPath: string): string {
  try {
    new URL(url);
    return url;
  } catch (err) {
    if (path.isAbsolute(url)) {
      return url.replace('index.md', '').replace('.md', '');
    }

    return path.normalize(`/docs/${path.dirname(githubPath)}/${url}`).replace('index.md', '').replace('.md', '')
  }
}

const octokit = new MyOctokit({
  auth: process.env.GITHUB_KEY,
  throttle: {
    onRateLimit: (
      retryAfter: number,
      options: Options,
      _octokit,
      retryCount: number
    ) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (retryCount < 1) {
        // only retries once
        console.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      } else
        throw `Request quota exhausted for request ${options.method} ${options.url}`;
    },
    onSecondaryRateLimit: (retryAfter: number, options: any) => {
      // does not retry, only logs a warning
      console.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
  request: {
    fetch: (url: string, opts: any) => {
      return fetch(url, { ...opts, next: { tags: ["v2"] } });
    },
  },
});

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
  const key = slug.join('')
  if (sidebarMemoryCache.has(key)) {
    return sidebarMemoryCache.get(key)
  }
  const { data, path } = await getDocContentFromSlug(version, slug)
  const md = Buffer.from(data.content, "base64").toString();
  const title = extractHeadingsFromMarkdown(md, 1)?.[0]

  sidebarMemoryCache.set(key, title || slug.shift())
  return sidebarMemoryCache.get(key)
};

export const loadV2DocumentationNav = cache(async (branch: string) => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: "api-platform",
      repo: "docs",
      path: "outline.yaml",
      ref: branch,
    });
    const result = Buffer.from((data as any).content, "base64");

    const navData = YAML.parse(result.toString());
    const basePath = branch === current ? `/docs` : `/docs/${branch}`;
    const nav = await Promise.all(
      navData.chapters.map(async (part: any) => ({
        title: part.title,
        basePath: `${basePath}/${part.path}`,
        links: await Promise.all(
          part.items.map(async (item: string) => ({
            title: (
              await getDocTitle(branch, [part.path, item === 'index' ? '' : item])
            ),
            link:
              item === "index"
                ? `${basePath}/${part.path}/`
                : `${basePath}/${part.path}/${item}`,
          }))
        ),
      }))
    );
    return nav;
  } catch (error) {
    console.error(error);
  }
  return [];
});

const indexes = ['admin', 'core', 'create-client', 'deployment', 'distribution', 'extra', 'schema-generator']

export const getDocContentFromSlug = async (version: string, slug: string[]) => {
  slug = slug.filter(v => v)
  const lastPart = slug.slice(-1)[0];
  const p = slug.join("/") + (indexes.includes(lastPart) ? '/index.md' : '.md');

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: "api-platform",
      repo: "docs",
      path: p,
      ref: version,
    });

    return { data, path: p }
  } catch (error) {
    console.error('An error occured while fetching %s', p)
    console.error(error);
    return { data: 'Error', path: p }
  }
};

export const getHtmlFromGithubContent = async ({ data, path: githubPath }: { data: any, path: string }) => {
  const result = Buffer.from(data.content, "base64").toString();

  marked.setOptions({ mangle: false, headerIds: false });

  const highlighter = await getHighlighter({
    themes: ["github-light", "one-dark-pro"],
  });
  const languages = highlighter.getLoadedLanguages()

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

  marked.use({
    walkTokens: (token) => {
      if (!['link', 'image', 'html'].includes(token.type)) {
        return;
      }

      if (token.type === 'html') {
        const $ = parseHtml(token.raw)
        $('a').map(function(i, elem) {
          const el = $(this)
          const href = el.attr('href')

          if (href) {
            el.attr('href', toAbsoluteUrl(href, githubPath))
          }

          return el
        })


        $('img').map(function(i, elem) {
          const el = $(this)
          const src = el.attr('src')

          if (src) {
            el.attr('src', toAbsoluteUrl(src, githubPath))
          }

          return el
        })

        token.text = $.html()
        return;
      }

      token.href = toAbsoluteUrl(token.href, githubPath)
    }
  })

  return marked.parse(result);
}
