import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "fs";
import { sortByStartDate } from "utils/con";
import { extractHeadingsFromMarkdown } from "utils";
import { getSpeakerById } from "./speakers";
import { Conference, Day, Speaker } from "types/con";
import { Locale, i18n } from "i18n/i18n-config";

export const getAllConferences = async (
  edition: string,
  withSpeakers: boolean,
  locale: Locale
) => {
  const slugs = await fs
    .readdirSync(
      path.join(process.cwd(), `data/con/${edition}/conferences/${locale}`)
    )
    .filter((el) => path.extname(el) === ".md")
    .map((slug: string) => slug.replace(/\.md$/, ""));
  console.log("getAllConferences", "conferences slugs : ", slugs);

  return Promise.all(
    slugs.map(async (slug: string) => {
      const conferenceData = await getConferenceData(
        edition,
        slug,
        false,
        withSpeakers
      );
      return conferenceData;
    })
  );
};

export const getConferencesBySpeaker = async (
  edition: string,
  speakerId: string,
  locale: Locale
) => {
  const conferences = await getAllConferences(edition, true, locale);
  return conferences
    .filter((conference) =>
      conference.speakers.find((speaker: Speaker) => speaker.id === speakerId)
    )
    .sort(sortByStartDate);
};

export const getAllConferenceSlugs = async (
  edition = "2022",
  locale: Locale = i18n.defaultLocale
) => {
  const slugs = await fs
    .readdirSync(
      path.join(process.cwd(), `data/con/${edition}/conferences/${locale}`)
    )
    .filter((el) => path.extname(el) === ".md")
    .map((slug: string) => slug.replace(/\.md$/, ""));
  return slugs;
};

export const getConferenceData = async (
  edition: string,
  slug: string,
  withDescription = true,
  withSpeakers = false,
  locale: Locale = i18n.defaultLocale
) => {
  console.log("getConferenceData");
  const fileContents = await fs.readFileSync(
    path.join(
      process.cwd(),
      `data/con/${edition}/conferences/${locale}/${slug}.md`
    ),
    "utf8"
  );
  console.log("fileContents ? ", fileContents);

  const days = (await import(`data/con/${edition}/days`)).default;
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = withDescription && marked(matterResult.content);

  const contentHtml = processedContent?.toString();

  const speakers = matterResult.data.speakers
    .split(" ")
    .map((slug: string) => slug.substring(1));

  const fullSpeakers = await Promise.all(
    speakers.map(async (id: string) => {
      const speakerData = await getSpeakerById(edition, id, locale);
      return speakerData;
    })
  );
  console.log("all conference speakers : ", fullSpeakers);

  // Combine the data with the id and contentHtml
  return {
    slug,
    edition,
    description: contentHtml,
    url: `/con/${edition}/conferences/${slug}`,
    ...matterResult.data,
    title: extractHeadingsFromMarkdown(matterResult.content, 1)?.[0],
    speakers: withSpeakers ? fullSpeakers : speakers,
    day:
      days.length > 1 &&
      days.find((day: Day) => day.date === matterResult.data.date),
  } as unknown as Conference;
};
