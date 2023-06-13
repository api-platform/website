import { sortByStartDate } from "utils/con";
import { getConferencesBySpeaker, getConferenceData } from "./con/conferences";
import { getAllSpeakers } from "./con/speakers";
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { Contributor } from "types";
import { notFound } from "next/navigation";
import { cache } from "react";
import { editions } from "data/con/editions";

interface Options {
  method?: string;
  url?: string;
}

function sortByContributions(a: Contributor, b: Contributor) {
  if (a.contributions < b.contributions) return 1;
  if (a.contributions > b.contributions) return -1;
  if (a.login && b.login) {
    if (a.login > b.login) return 1;
    if (a.login < b.login) return -1;
  }

  return 0;
}

const MyOctokit = Octokit.plugin(throttling);

export const octokit = new MyOctokit({
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
    onSecondaryRateLimit: (_retryAfter: number, options: Options) => {
      // does not retry, only logs a warning
      console.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
  request: {
    fetch: (url: string, opts: any) => {
      return fetch(url, { ...opts, next: { tags: ["contributors"] } });
    },
  },
});

export const getAllContributors = cache(async () => {
  const contributors: Contributor[] = [];

  try {
    const REPOSITORIES_TO_IGNORE = ["symfonycon-berlin-workshop-eod"];

    const result = await octokit.rest.repos.listForOrg({
      org: "api-platform",
    });
    if (result.status !== 200) throw "oups";
    const { data } = result;

    const repositories = [
      ...data
        .map((repository) => ({ owner: "api-platform", repo: repository.name }))
        .filter(({ repo }) => !REPOSITORIES_TO_IGNORE.includes(repo)),
      { owner: "dunglas", repo: "mercure" },
      { owner: "dunglas", repo: "vulcain" },
    ];

    await Promise.all(
      repositories.map(async ({ repo, owner }) => {
        const repositoryContributors = await octokit.paginate(
          octokit.rest.repos.listContributors,
          {
            owner,
            repo,
            per_page: 100,
          }
        );
        repositoryContributors.map((contributor) => {
          const existingContributor = contributors.find(
            (c) => c.login === contributor.login
          );
          if (existingContributor) {
            existingContributor.contributions += contributor.contributions;
            existingContributor.repos.push({
              repo,
              contributions: contributor.contributions,
              url: `https://github.com/${owner}/${repo}`,
            });
          } else {
            contributors.push({
              ...contributor,
              repos: [
                {
                  repo,
                  contributions: contributor.contributions,
                  url: `https://github.com/${owner}/${repo}`,
                },
              ],
              additions: 0,
              deletions: 0,
              rank: 0,
            });
          }
        });
      })
    );

    const sortedContributors = contributors
      .filter((c) => c.login && !c.login.includes("[bot]"))
      .sort(sortByContributions)
      .map((contributor, index) => ({ ...contributor, rank: index + 1 }));

    const { data: teams } = await octokit.rest.teams.list({
      org: "api-platform",
    });
    await Promise.all(
      teams
        .filter((t) => t.slug.includes("core-team"))
        .map(async ({ slug }) => {
          const { data: members } = await octokit.rest.teams.listMembersInOrg({
            org: "api-platform",
            team_slug: slug,
          });
          members.forEach((member) => {
            const contributor = sortedContributors.find(
              (c) => c.login === member.login
            );
            if (contributor) contributor.isCoreTeam = true;
          });
        })
    );
    return sortedContributors;
  } catch (e) {
    console.error(e);
    return [];
  }
});

export const getContributorBySlug = cache(async (slug: string) => {
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
  return notFound();
});

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
