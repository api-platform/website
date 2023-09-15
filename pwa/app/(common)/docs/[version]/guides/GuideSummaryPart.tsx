import Link from "components/common/Link";

interface GuideSummaryPartProps {
  title: string;
  link: string;
}

export default function GuideSummaryPart({
  title,
  link,
}: GuideSummaryPartProps) {
  return (
    <div className="mb-12 last:mb-0 overflow-x-hidden">
      <Link
        href={link}
        prefetch={false}
        className="flex flex-row items-center justify-start transition-all py-1 pr-1.5 group | hover:text-blue hover:pr-0 hover:pl-1.5"
      >
        <h2 className="text-xl font-semibold text-blue mb-3 border-b-px border-b-gray-300 pb-2 overflow-x-hidden whitespace-nowrap text-ellipsis | md:text-3xl ">
          {title}
        </h2>
      </Link>
    </div>
  );
}
