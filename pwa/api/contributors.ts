import { sortByStartDate } from "utils/con";
import { getConferencesBySpeaker, getConferenceData } from "./con/conferences";
import { getAllSpeakers } from "./con/speakers";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { Contributor } from "types";
import { notFound } from "next/navigation";
import { cache } from "react";
import { editions } from "data/con/editions";
import fs from "fs";

interface Options {
  method?: string;
  url?: string;
}

const MyOctokit = Octokit.plugin(throttling);

export const octokit = new MyOctokit({
  auth: process.env.GITHUB_KEY,
  throttle: {
    onRateLimit: (
      retryAfter: number,
      options: Options,
      _octokit: any,
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
    onSecondaryRateLimit: (_retryAfter: number, options: Options) => {
      // does not retry, only logs a warning
      console.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
  request: {
    fetch: (url: string, opts: any) => {
      return fetch(url, {
        ...opts,
        next: { tags: ["contributors"], revalidate: 86400 },
      });
    },
  },
});

export const getAllContributors = cache(async () => {
  const contributors: Contributor[] = [];

  try {
    if (fs.existsSync("data/contributors.json")) {
      const data = fs.readFileSync("data/contributors.json", "utf-8");
      const allContributors: Contributor[] = JSON.parse(data);
      /*const allContributors: Contributor[] = (
        await import("data/contributors.json")
      ).default;*/
      return allContributors as Contributor[];
    }
    return contributors;
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
    const { data } = await octokit.rest.users.getByUsername({
      username: slug,
    });
    return {
      ...contributor,
      location: data.location,
      company: data.company,
      bio: data.bio,
      blog: data.blog,
      name: data.name ? data.name : undefined,
    };
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
