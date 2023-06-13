import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { Locale } from "i18n/i18n-config";
import { getPlaceholder } from "utils/getPlaceholder";

import { Speaker } from "types/con";

export const getAllSpeakers = async (edition: string, locale: Locale) => {
  try {
    const slugs = (
      await readdir(
        path.resolve(process.cwd(), `data/con/${edition}/speakers/${locale}`)
      )
    )
      .filter((el) => path.extname(el) === ".md")
      .map((slug: string) => slug.replace(/\.md$/, ""));

    return Promise.all(
      slugs.map((slug: string) => getSpeakerData(edition, slug, locale, false))
    );
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAllSpeakerSlugs = async (edition: string, locale: string) => {
  try {
    const slugs = (
      await readdir(
        path.join(process.cwd(), `data/con/${edition}/speakers/${locale}`)
      )
    )
      .filter((el) => path.extname(el) === ".md")
      .map((slug: string) => slug.replace(/\.md$/, ""));
    return slugs;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getSpeakerData = async (
  edition: string,
  slug: string,
  locale: string,
  withDescription = true
) => {
  const fileContents = await readFile(
    `data/con/${edition}/speakers/${locale}/${slug}.md`,
    "utf8"
  );
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const { id } = matterResult.data;

  marked.setOptions({ mangle: false, headerIds: false });

  const processedContent =
    withDescription && (await marked(matterResult.content, { async: true }));

  const contentHtml = processedContent?.toString();

  const placeholder = await getPlaceholder(
    path.join(process.cwd(), `/public/images/con/${edition}/speakers/${id}.png`)
  );

  // Combine the data with the id and contentHtml
  return {
    slug,
    edition,
    contentHtml,
    image: `/images/con/${edition}/speakers/${id}.png`,
    placeholder,
    url: `/${locale}/con/${edition}/speakers/${slug}`,
    ...matterResult.data,
    number: matterResult.data.number || 0,
  } as Speaker;
};

export const getSpeakerById = async (
  edition: string,
  id: string,
  locale: Locale
) => {
  const speakers = await getAllSpeakers(edition, locale);
  return speakers.find((speaker: Speaker) => speaker.id === id);
};
