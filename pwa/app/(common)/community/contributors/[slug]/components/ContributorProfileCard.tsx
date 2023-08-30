/* eslint-disable @next/next/no-img-element */
import { Github } from "components/icons/social";
import { Contributor } from "types";
import { Location, Company, Website } from "components/icons";
import classNames from "classnames";
import TextIconInfo from "components/common/TextIconInfo";

export default function ContributorProfileCard({
  contributor,
  className,
}: {
  contributor: Contributor;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "bg-white dark:bg-blue-black text-text-secondary dark:text-gray-100 dark:border-blue dark:border-px p-3 flex flex-col duration-300 group",
        className
      )}
    >
      <div className="overflow-hidden w-full aspect-square bg-gray-100 dark:bg-blue-darkest border-px border-gray-100 dark:border-blue-darkest">
        {contributor.avatar_url ? (
          <img
            alt=""
            src={contributor.avatar_url}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
          />
        ) : null}
      </div>
      {contributor.isCoreTeam ? (
        <img
          src="/images/badges/core-team.svg"
          alt="Core team badge"
          width={80}
          height={80}
          className="absolute top-72 right-2 -translate-y-3/4 | lg:top-80"
        />
      ) : null}
      <div className="mt-4 flex-col flex text-sm divide-y-px divide-gray-300 dark:divide-blue-dark divide-dotted">
        {contributor.location ? (
          <TextIconInfo Icon={Location} higlightIcon>
            {contributor.location}
          </TextIconInfo>
        ) : null}
        {contributor.company ? (
          <TextIconInfo
            Icon={Company}
            higlightIcon
            link={
              contributor.company?.startsWith("@")
                ? `https://github.com/${contributor.company.substring(1)}`
                : undefined
            }
          >
            {contributor.company}
          </TextIconInfo>
        ) : null}
        {contributor.blog ? (
          <TextIconInfo higlightIcon Icon={Website} link={contributor.blog}>
            {contributor.blog}
          </TextIconInfo>
        ) : null}
        {contributor.login ? (
          <TextIconInfo
            higlightIcon
            Icon={Github}
            link={`https://github.com/${contributor.login}`}
          >
            {contributor.login}
          </TextIconInfo>
        ) : null}
      </div>
    </div>
  );
}
