import {
  getAllContributors,
  getContributorBySlug,
  getContributorConferencesBySlug,
} from "api/contributors";
import Heading from "components/common/typography/Heading";
import RepoLink from "./components/RepoLink";
import Link from "components/common/Link";
import ContributorRepositories from "./components/ContributorRepositories";
import ContributorProfileCard from "./components/ContributorProfileCard";
import { Fragment } from "react";
import ContributorVideos from "./components/ContributorVideos";
import ShapeSection from "components/common/ShapeSection";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const dictionary = await import(`data/meta.json`);
  const contributor = await getContributorBySlug(slug);

  const contributorName = contributor.name || contributor.login || "";
  const title = dictionary["contributor"].title.replace(
    "%name%",
    contributorName
  );
  const description = dictionary["contributor"].description.replace(
    "%name%",
    contributorName
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

const externalLinkAttributes =
  'target="_blank" rel="nofollow noopener noreferrer"';

const parseGithubText = (text: string) => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

  const linkifyText = text.replace(
    urlRegex,
    (url) => `<a href="${url}" ${externalLinkAttributes}">${url}</a>`
  );
  const githubRegex = /(^|\s)@([a-zA-Z-]+)/gi;

  return linkifyText.replace(
    githubRegex,
    (githubResource) =>
      `<a class="link" href="https://github.com/${githubResource
        .trim()
        .replace("@", "")}" ${externalLinkAttributes}">${githubResource}</a>`
  );
};

export async function generateStaticParams() {
  const contributors = await getAllContributors();
  return contributors.map((c) => ({ slug: c.login }));
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const contributor = await getContributorBySlug(slug);
  const conferences = await getContributorConferencesBySlug(slug);

  const contributorName = contributor.name || contributor.login;

  const getContributionsText = () => {
    if (10 >= contributor.rank) {
      return `${
        contributor.isCoreTeam ? "As an API Platform core team member, " : ""
      }${contributorName} is one of the most active contributors to the API Platform framework and worked on`;
    }
    if (20 < contributor.contributions) {
      return `${
        contributor.isCoreTeam ? "As an API Platform core team member, " : ""
      }${contributorName} enhanced the API Platform framework with no less than ${
        contributor.contributions
      } contributions. This active contributor worked on`;
    }
    return `${contributorName} is a ${
      contributor.isCoreTeam ? "core team member and a " : ""
    }contributor to the API Platform framework and worked on`;
  };

  const getProjectsText = () => {
    if (1 === contributor.repos.length) {
      const repo = contributor.repos[0];
      return <RepoLink repo={repo} />;
    }

    if (4 < contributor.repos.length) {
      const subRepos = [...contributor.repos.slice(0, 3)];
      return subRepos.map((repo, index) => (
        <Fragment key={repo.repo}>
          <RepoLink repo={repo} />
          {index === subRepos.length - 1
            ? ` and ${contributor.repos.length - 3} others.`
            : ", "}
        </Fragment>
      ));
    }
    return contributor.repos.map((repo, index) => (
      <>
        <RepoLink repo={repo} />
        {index === contributor.repos.length - 2
          ? " and "
          : index === contributor.repos.length - 1
          ? "."
          : ", "}
      </>
    ));
  };

  return (
    <>
      <ShapeSection
        effect="right-triangle"
        maskColor="white"
        darkModeColor="blue-black"
        className="bg-blue pb-4 text-white dark:text-blue-black"
      >
        <div className="container xl:max-w-6xl pt-28 text-center relative flex flex-col md:flex-row md:items-end md:justify-start | lg:min-h-[400px] ">
          <div className="text-center md:text-left | md:flex-1 md:pb-12">
            <Link
              className="uppercase font-semibold text-sm mb-2 opacity-80"
              href="/community/contributors"
              prefetch={false}
            >
              Our contributors
            </Link>
            <Heading size="xl" level="h1">
              <strong>#{contributor.rank}</strong>{" "}
              <span>{contributorName}</span>
            </Heading>
            <p className="uppercase font-extralight py-4 text-xl">{`${
              contributor.contributions
            } contribution${contributor.contributions > 1 ? "s" : ""}`}</p>
          </div>
          <ContributorProfileCard
            contributor={contributor}
            className="z-10 mx-auto transition-all md:rotate-2 shadow-md w-72 lg:w-80 translate-y-6 -mb-12 hover:shadow-xl hover:scale-105 | lg:mb-0 lg:absolute lg:top-24 lg:right-0 "
          />
        </div>
      </ShapeSection>
      <div className="container xl:max-w-6xl pb-12 pt-20 leading-relaxed lg:pr-96">
        {contributor.bio && (
          <p
            className="mb-4 font-bold"
            dangerouslySetInnerHTML={{
              __html: parseGithubText(contributor.bio),
            }}
          />
        )}
        {getContributionsText()}{" "}
        {contributor.repos.length === 1
          ? "1 repository:"
          : `${contributor.repos.length} repositories:`}{" "}
        {getProjectsText()}
      </div>
      <div className="bg-gray-100 dark:bg-blue-darkest">
        <div className="container xl:max-w-6xl py-12">
          <h2 className="border-l-4 leading-none border-l-blue pl-2 font-title font-semibold uppercase text-xl mb-6">{`${contributorName}'s contributions`}</h2>
          <ContributorRepositories contributor={contributor} />
        </div>
      </div>
      {conferences.length > 0 ? (
        <div className="container xl:max-w-6xl py-12">
          <h2 className="border-l-4 leading-none border-l-blue pl-2 font-title font-semibold uppercase text-xl mb-6">{`${contributorName}'s talks`}</h2>
          <ContributorVideos conferences={conferences} />
        </div>
      ) : null}
    </>
  );
}
