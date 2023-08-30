import { sortByStartDate } from "utils/con";
import { getConferencesBySpeaker, getConferenceData } from "./con/conferences";
import { getAllSpeakers } from "./con/speakers";
import { Contributor } from "types";
import { notFound } from "next/navigation";
import { cache } from "react";
import { editions } from "data/con/editions";

export const getAllContributors = cache(async () => {
  const contributors: Contributor[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const allContributors: Contributor[] = (
      await import("data/contributors.json")
    ).default;
    return allContributors;
  } catch (e) {
    console.error(e);
    return contributors;
  }
});

export async function getContributorBySlug(slug: string): Promise<Contributor> {
  const allContributors = await getAllContributors();
  const contributor = allContributors.find(
    (contributor) => contributor.login === slug
  );
  if (contributor) {
    return contributor;
  }
  notFound();
}

// TODO: replace the method when events pages will be done
export async function getContributorConferencesBySlug(slug: string) {
  const conferences = await Promise.all(
    editions.map(async (edition) => {
      const editionSpeakers = await getAllSpeakers(edition.year, "en");
      const contributorSpeaker = editionSpeakers.find(
        (speaker) => speaker.github?.replace("https://github.com/", "") === slug
      );
      if (!contributorSpeaker) return [];
      const conferences = await getConferencesBySpeaker(
        edition.year,
        contributorSpeaker.id,
        "en"
      );
      return conferences;
    })
  );
  const fullConferences = await Promise.all(
    conferences
      .flat()
      .sort(sortByStartDate)
      .reverse()
      .map(async (c) => await getConferenceData(c.edition, c.slug || "", true))
  );
  const regex =
    /<a.*?href="(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+(?:&\S+)?)"[^>]*><img.*?src="(https?:\/\/\S+\.(?:png|jpe?g|gif))"/;
  const result = fullConferences
    .filter((c) => c.description?.match(regex) !== null)
    .map((c) => ({
      title: c.title,
      youtubeLink: c.description?.match(regex)?.[1] || "",
      imageLink: c.description?.match(regex)?.[2] || "",
    }));
  return result;
}

export async function getContributors(start: number, count: number) {
  const allContributors = await getAllContributors();
  return [...allContributors].slice(start, count);
}
