import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { Contributor } from "types";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const MyOctokit = Octokit.plugin(throttling);

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
      });
    },
  },
});

export const getAllContributors = async () => {
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
};
