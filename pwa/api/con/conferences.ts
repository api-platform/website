import { unbreakable } from "./../../utils/index";
import path from "node:path";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { sortByStartDate } from "utils/con";
import { extractTitleFromMarkdown } from "utils";
import { getSpeakerById } from "./speakers";
import { Conference, Day, Speaker, Track } from "types/con";
import { Locale, i18n } from "i18n/i18n-config";
import MarkdownIt from "markdown-it";

export const getAllConferences = async (
  edition: string,
  withSpeakers: boolean,
  locale: Locale
) => {
  const slugs = (
    await readdir(path.join(process.cwd(), `data/con/${edition}/conferences`))
  )
    .filter((el) => path.extname(el) === ".md")
    .map((slug) => slug.replace(/\.md$/, ""));

  return Promise.all(
    slugs.map((slug) =>
      getConferenceData(edition, slug, false, withSpeakers, locale)
    )
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

export const getAllConferenceSlugs = async (edition = "2022") => {
  return (
    await readdir(path.join(process.cwd(), `data/con/${edition}/conferences`))
  )
    .filter((el) => path.extname(el) === ".md")
    .map((slug: string) => slug.replace(/\.md$/, ""));
};

export const getConferenceData = async (
  edition: string,
  slug: string,
  withDescription = true,
  withSpeakers = false,
  locale: Locale = i18n.defaultLocale
) => {
  const fileContents = await readFile(
    path.join(process.cwd(), `data/con/${edition}/conferences/${slug}.md`),
    "utf8"
  );

  const days = (await import(`data/con/${edition}/days`)).default;
  const tracks = (await import(`data/con/${edition}/tracks`)).default;
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const contentHtml = withDescription ? md.render(matterResult.content) : "";

  const speakers = matterResult.data.speakers
    .split(" ")
    .map((slug: string) => slug.substring(1));

  const fullSpeakers = await Promise.all(
    speakers.map((id: string) => getSpeakerById(edition, id, locale))
  );

  // Combine the data with the id and contentHtml
  return {
    slug,
    edition,
    description: contentHtml,
    url: `/con/${edition}/conferences/${slug}`,
    ...matterResult.data,
    title: unbreakable(extractTitleFromMarkdown(matterResult.content) || ""),
    speakers: withSpeakers ? fullSpeakers : speakers,
    track: tracks.find((track: Track) => track.id === matterResult.data.track),
    day:
      days.length > 1 &&
      days.find((day: Day) => day.date === matterResult.data.date),
  } as unknown as Conference;
};
