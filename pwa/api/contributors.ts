import { sortByStartDate } from "utils/con";
import { getConferencesBySpeaker, getConferenceData } from "./con/conferences";
import { getAllSpeakers } from "./con/speakers";
import { Contributor } from "types";
import { notFound } from "next/navigation";
import { editions } from "data/con/editions";
import allContributors from "data/contributors.json";

export const getAllContributors = () => {
  const contributors: Contributor[] = [];

  try {
    return allContributors as Contributor[];
  } catch (e) {
    console.error(e);
    return contributors;
  }
};

export function getContributorBySlug(slug: string): Contributor {
  const allContributors = getAllContributors();
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

export function getContributors(start: number, count: number) {
  const allContributors = getAllContributors();
  return [...allContributors].slice(start, count);
}
