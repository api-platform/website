import { Speaker } from "types/con";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "fs";
import { Locale } from "i18n/i18n-config";
import { getPlaceholder } from "utils/getPlaceholder";

export const getAllSpeakers = async (edition: string, locale: Locale) => {
  try {
    const slugs = await fs
      .readdirSync(
        path.resolve(process.cwd(), `data/con/${edition}/speakers/${locale}`)
      )
      .filter((el) => path.extname(el) === ".md")
      .map((slug: string) => slug.replace(/\.md$/, ""));

    return Promise.all(
      slugs.map(async (slug: string) => {
        const speakerData = await getSpeakerData(edition, slug, locale, false);
        return speakerData;
      })
    );
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAllSpeakerSlugs = async (edition: string, locale: string) => {
  try {
    const slugs = await fs
      .readdirSync(
        path.join(process.cwd(), `data/con/${edition}/speakers/${locale}`)
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
  const fileContents = await fs.readFileSync(
    `data/con/${edition}/speakers/${locale}/${slug}.md`,
    "utf8"
  );
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const { id } = matterResult.data;

  const processedContent =
    withDescription && (await marked(matterResult.content));

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
