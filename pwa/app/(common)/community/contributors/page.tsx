import Heading from "components/common/typography/Heading";
import ContributorItem from "./components/ContributorItem";
import ContributorSmallItem from "./components/ContributorSmallItem";
import { getAllContributors } from "api/contributors";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["contributors"].title,
    description: dictionary["contributors"].description,
  };
}

export default async function Page() {
  const contributors = await getAllContributors();
  return (
    <div className="py-16">
      <div className="bg-blue py-12 text-white dark:text-blue-black">
        <div className="container text-center">
          <Heading size="xl" level="h1">
            Our <strong>contributors</strong>
          </Heading>
          <p className="font-light text-lg mt-4">{`${contributors.length} people have contributed to API Platform code.`}</p>
        </div>
      </div>
      <div className="container py-4 xl:max-w-5xl">
        <div className="flex flex-row flex-wrap items-center justify-center">
          {contributors.slice(0, 10).map((contributor) => (
            <ContributorItem key={contributor.id} contributor={contributor} />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-blue-darkest">
        <div className="container xl:max-w-5xlpt-6">
          <Heading level="h2" size="lg" className="text-center py-6 text-blue">
            Top 100
          </Heading>
          <div className="grid grid-cols-1 gap-2 pb-12 max-w-sm mx-auto | sm:max-w-none  sm:grid-cols-2 | lg:grid-cols-3">
            {contributors.slice(10, 100).map((contributor) => (
              <ContributorSmallItem
                key={contributor.id}
                contributor={contributor}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container pt-6">
        <Heading level="h2" size="lg" className="py-6 text-blue text-center">
          All contributors
        </Heading>
        <div className="grid grid-cols-1 overflow-x-hidden max-w-sm mx-auto | sm:gap-2 sm:max-w-none sm:grid-cols-2 | md:grid-cols-3 lg:grid-cols-4">
          {contributors.slice(100).map((contributor) => (
            <ContributorSmallItem
              key={contributor.id}
              contributor={contributor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
