import Heading from "components/common/typography/Heading";
import Image from "next/image";
import Link from "components/common/Link";
import { Contributor } from "types";

interface ContributorSmallItemProps {
  contributor: Contributor;
}

export default function ContributorSmallItem({
  contributor,
}: ContributorSmallItemProps) {
  return (
    <Link
      href={`/community/contributors/${contributor.login}`}
      prefetch={false}
      className="relative flex justify-start items-center sm:transition-all group | sm:p-2 sm:duration-500 sm:border-px sm:border-gray-500/10 sm:hover:bg-gray-500/10 sm:dark:border-gray-500/30 sm:dark:hover:bg-gray-500/30"
    >
      {contributor.rank <= 100 ? (
        <div className="w-10 h-10 rounded-full relative aspect-square overflow-hidden mr-4 | sm:w-16 sm:h-16 ">
          <Image
            alt=""
            src={contributor.avatar_url || ""}
            width={128}
            height={128}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
          />
        </div>
      ) : null}
      <div>
        <Heading level="h3" size="xs">
          <strong>#{contributor.rank}</strong> {contributor.login}
        </Heading>
        <p className="hidden text-xs font-semibold uppercase text-blue dark:text-blue-light transition-all group-hover:translate-y-1 | sm:block">
          {`${contributor.contributions} contribution${
            contributor.contributions > 1 ? "s" : ""
          }`}
        </p>
      </div>
      {contributor.isCoreTeam ? (
        <Image
          src="/images/badges/core-team.svg"
          alt="Core team badge"
          width={30}
          height={30}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        />
      ) : null}
    </Link>
  );
}
