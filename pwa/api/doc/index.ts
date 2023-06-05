import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadingsFromMarkdown } from "utils";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { getHighlighter } from "shiki";
import YAML from "yaml";
import { marked } from "marked";
import { cache } from "react";
import { current } from "consts";

export const MyOctokit = Octokit.plugin(throttling);

const octokit = new MyOctokit({
  auth: process.env.GITHUB_KEY,
  throttle: {
    onRateLimit: (retryAfter: number, options: any, retryCount: number) => {
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
            /*title: (
              await getDocContentFromSlug(branch, [part.path, item])
            ).title,*/
            title: item,
            link:
              item === "index"
                ? `${basePath}/${part.path}`
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

export const getDocContentFromSlug = cache(
  async (version: string, slug: string[]) => {
    const headers = new Headers();
    headers.append("accept", "application/vnd.github+json");
    headers.append("authorization", "Bearer " + process.env.GITHUB_KEY);
    headers.append("X-GitHub-Api-Version", "2022-11-28");
    console.log(slug);

    try {
      const res = await fetch(
        `https://api.github.com/repos/api-platform/docs/contents/${slug.join(
          "/"
        )}.md?ref=${version}`,
        { next: { tags: ["v2"] }, headers }
      );
      return await getHtmlFromGithubRaw(res);
    } catch {
      try {
        const res = await fetch(
          `https://api.github.com/repos/api-platform/docs/contents/${slug.join(
            "/"
          )}/index.md?ref=${version}`,
          { next: { tags: ["v2"] } }
        );
        return await getHtmlFromGithubRaw(res);
      } catch (error) {
        console.error(error);
        return {
          html: "",
          title: "",
        };
      }
    }
  }
);

async function getHtmlFromGithubRaw(res: Response) {
  const data = await res.json();
  const result = Buffer.from((data as any).content, "base64").toString();
  const title = extractHeadingsFromMarkdown(result, 1)?.[0];

  const highlighter = await getHighlighter({
    themes: ["github-light", "one-dark-pro"],
  });

  marked.setOptions({
    langPrefix: "not-prose language-",
    highlight: function (code, lang) {
      return (
        highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }) +
        highlighter.codeToHtml(code, { lang, theme: "github-light" })
      );
    },
  });

  const html = marked.parse(
    result.replaceAll("index.md", "").replaceAll(".md", "")
  );
  return { html, title };
}
