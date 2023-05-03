import Image from "next/image";
import { Contributor } from "types";
import classNames from "classnames";
import Link from "next/link";
import Heading from "components/common/typography/Heading";

interface ContributorItemProps {
  contributor: Contributor;
}

export default function ContributorItem({ contributor }: ContributorItemProps) {
  return (
    <div
      className={classNames(
        "px-4 py-3 w-full flex justify-center",
        contributor.rank !== 1 && "sm:w-1/2 | lg:w-1/3"
      )}
    >
      <Link
        className={classNames(
          "relative w-full max-w-[250px] flex justify-center items-center group cursor-pointer flex-col p-4 transition-all duration-500 hover:scale-105 hover:bg-blue-extralight/0",
          contributor.rank === 1 && "sm:flex-row sm:w-fit sm:max-w-none"
        )}
        href={`/community/contributors/${contributor.login}`}
      >
        <div className="relative">
          <div
            className={classNames(
              "rounded-full relative aspect-square overflow-hidden mb-4 w-52 border-blue-extralight border-4",
              contributor.rank === 1 && "sm:w-72"
            )}
          >
            <Image
              alt=""
              src={contributor.avatar_url || ""}
              width={contributor.rank === 1 ? 400 : 200}
              height={contributor.rank === 1 ? 400 : 200}
              className="w-full h-full object-cover group-hover:-rotate-6 group-hover:scale-110 duration-700 transition-all"
              loading="eager"
            />
          </div>
          {contributor.isCoreTeam ? (
            <Image
              src="/images/badges/core-team.svg"
              alt="Core team badge"
              width={80}
              height={80}
              className={classNames(
                "absolute right-0 bottom-0 -translate-y-1/2 -translate-x-1/4",
                contributor.rank === 1 ? "w-16 h-16" : "w-12 h-12"
              )}
            />
          ) : null}
        </div>
        <div className="px-5 text-center">
          <Heading
            className="border-blue-extralight border-dotted border-b-2 group-hover:border-blue"
            level="h3"
            size={contributor.rank === 1 ? "lg" : "sm"}
          >
            #{contributor.rank} {contributor.login}
          </Heading>
          <div className="text-blue dark:text-blue-light font-title leading-none mt-2 transition-colors group-hover:text-blue-dark dark:group-hover:text-blue">
            <p className={"text-6xl font-bold"}>{contributor.contributions}</p>
            <p className="text-sm uppercase font-semibold">contributions</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
