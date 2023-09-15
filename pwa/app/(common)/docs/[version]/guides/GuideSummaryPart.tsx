import Link from "components/common/Link";
import { GuideFrontMatter } from "types";

interface Guide extends GuideFrontMatter {
  title: string;
  link: string;
}

interface GuideSummaryPartProps {
  title: string;
  guides: Guide[];
}

export default function GuideSummaryPart({
  title,
  guides,
}: GuideSummaryPartProps) {
  return (
    <div className="mb-12 last:mb-0 overflow-x-hidden">
      <h2 className="text-xl font-semibold text-blue mb-3 border-b-px border-b-gray-300 pb-2 overflow-x-hidden whitespace-nowrap text-ellipsis | md:text-3xl ">
        {title !== ""
          ? title.charAt(0).toUpperCase() + title.slice(1)
          : "Common"}
      </h2>
      <div className="grid grid-cols-1 gap-x-1 text-gray-700 font-light dark:text-gray-300 | lg:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.link}
            prefetch={false}
            className="flex flex-row items-center justify-start transition-all py-1 pr-1.5 group | hover:text-blue hover:pr-0 hover:pl-1.5"
          >
            <span className="overflow-x-hidden whitespace-nowrap text-ellipsis">
              {guide.title}
            </span>
            <div className="ml-2 space-x-2 flex items-center">
              {guide.tags?.length &&
                guide.tags[0].length !== 0 &&
                guide.tags?.slice(1).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-blue px-1.5 py-0.5 text-[10px] font-medium uppercase text-white"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
