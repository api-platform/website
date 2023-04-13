import path from "path";
import fs from "fs";
import { extractHeadingsFromMarkdown } from "utils";
import { Event, EventWithContent } from "types";
import { getAllContributors } from "./contributors";
import dayjs from "dayjs";

function sortByEventStartDate(eventA: Event, eventB: Event) {
  const date1 = dayjs(eventA.startDate.date);
  const date2 = dayjs(eventB.startDate.date);
  if (date1.isBefore(date2)) return 1;
  if (date1.isAfter(date2)) return -1;
  return 0;
}

export async function getAllEvents(withContent?: boolean) {
  const directory = "data/events";

  const files = (
    await fs.readdirSync(path.join(process.cwd(), directory))
  ).filter((file) => path.extname(file) === ".mdx");

  const events = await Promise.all(
    files.map(async (file) => {
      const resultMdx = await import(`data/events/${file}`);
      // return resultMdx.meta;
      const fullPath = path.join(process.cwd(), directory, file);
      const fileContents = await fs.readFileSync(fullPath, "utf8");
      return {
        ...resultMdx.meta,
        title: extractHeadingsFromMarkdown(fileContents, 1)?.[0],
        slug: path.parse(file).name,
        Mdx: withContent && resultMdx.default,
      };
    })
  );
  return events.sort(sortByEventStartDate);
}

async function getSpeakerLink(login: string) {
  const contributors = await getAllContributors();
  const contributor = contributors.find(
    (contributor) => contributor.login === login
  );
  if (contributor) return `/community/contributors/${login}`;
  else return `https://github.com/${login}`;
}

export async function getEventContent(slug: string): Promise<EventWithContent> {
  const resultMdx = await import(`data/events/${slug}.mdx`);
  const fullPath = path.join(process.cwd(), `data/events/${slug}.mdx`);
  const fileContents = await fs.readFileSync(fullPath, "utf8");
  return {
    ...resultMdx.meta,
    title: extractHeadingsFromMarkdown(fileContents, 1)?.[0],
    Mdx: resultMdx.default,
    speakers: await Promise.all(
      resultMdx.meta.speakers?.map(async (speaker: { github?: string }) =>
        speaker.github
          ? { ...speaker, link: await getSpeakerLink(speaker.github) }
          : speaker
      )
    ),
  };
}
