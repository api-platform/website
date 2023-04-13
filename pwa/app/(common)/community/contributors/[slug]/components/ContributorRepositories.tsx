import { Github } from "components/icons/social";
import { Contributor } from "types";

export default function ContributorRepositories({
  contributor,
}: {
  contributor: Contributor;
}) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] w-full">
      {contributor.repos.map((repo) => (
        <a
          href={`${repo.url}/commits?author=${contributor.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-blue-black dark:border-blue-dark dark:border-px relative shadow-md w-full p-4 flex items-center flex-row gap-4 transition-all hover:shadow-xl hover:scale-105 hover:z-10"
          key={repo.repo}
        >
          <Github className="h-8 w-8 text-blue" />
          <div className="flex-1 flex-col flex overflow-hidden">
            <h3 className="uppercase font-bold text-blue overflow-hidden whitespace-nowrap text-ellipsis">
              {repo.repo}
            </h3>
            <p className="text-text-secondary dark:text-gray-300 text-sm">{`${
              repo.contributions
            } contribution${repo.contributions > 1 ? "s" : ""}`}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
