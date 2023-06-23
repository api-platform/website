import Link from "components/common/Link";
import { DocReferenceLink } from "types";
import ReferenceTypeIcon from "./ReferenceTypeIcon";

interface ReferenceSummaryPartProps {
  title: string;
  links: DocReferenceLink[];
}

export default function ReferenceSummaryPart({
  title,
  links,
}: ReferenceSummaryPartProps) {
  return (
    <div className="mb-12 last:mb-0 overflow-x-hidden">
      <h2 className="text-xl font-semibold text-blue mb-3 border-b-px border-b-gray-300 pb-2 overflow-x-hidden whitespace-nowrap text-ellipsis | md:text-3xl ">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-x-1 text-gray-700 font-light dark:text-gray-300 | lg:grid-cols-2 | xl:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            className="flex flex-row items-center justify-start transition-all py-1 pr-1.5 group | hover:text-blue hover:pr-0 hover:pl-1.5"
          >
            <ReferenceTypeIcon type={link.type} />
            <span className="flex-1 overflow-x-hidden whitespace-nowrap text-ellipsis">
              {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
