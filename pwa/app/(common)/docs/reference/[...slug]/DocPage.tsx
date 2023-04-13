import classNames from "classnames";
import ReferenceTypeIcon from "../../references/ReferenceTypeIcon";
import React from "react";
import baseComponents from "app/common/components/doc/getBaseComponents";
import BreadCrumbs from "components/docs/BreadCrumbs";
import { MdxComponent } from "types";

function DocPage({
  Mdx,
  type,
  slug,
}: {
  Mdx: MdxComponent;
  type: string;
  slug: string[];
}) {
  const breadCrumbs = [
    { title: "References", link: "/docs/references" },
    { title: slug[slug.length - 1] },
  ];

  return (
    <div
      className={classNames(
        "px-6 md:px-10 py-6 leading-loose text-blue-black/80 | dark:text-white/80"
      )}
    >
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <span className="text-xs uppercase text-gray-500 dark:text-gray-500">
        Reference
      </span>
      <div className="uppercase text-sm font-bold flex flex-row items-center mb-2">
        <ReferenceTypeIcon type={type} /> <span>{type}</span>
      </div>
      <div className="prose max-w-none dark:prose-invert prose-headings:font-title prose-h1:font-bold prose-code:after:hidden prose-code:before:hidden prose-code:py-1 prose-code:px-1.5 prose-code:bg-gray-100 prose-code:dark:bg-blue-darkest prose-h1:border-b-px prose-h1:border-b-gray-300 prose-h1:pb-2 max-md:prose-tr:flex max-md:prose-tr:flex-col max-md:prose-td:px-0 max-md:prose-td:py-1">
        <Mdx components={baseComponents} />
      </div>
    </div>
  );
}

export default DocPage;
