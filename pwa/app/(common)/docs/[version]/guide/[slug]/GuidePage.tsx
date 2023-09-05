import classNames from "classnames";
import React from "react";
import baseComponents from "app/common/components/doc/getBaseComponents";
import SectionGuide from "app/common/components/doc/SectionGuide";
import BreadCrumbs from "components/docs/BreadCrumbs";
import { MdxComponent } from "types";
import { current } from "consts";

export default function DocPage({
  Mdx,
  title,
  slug,
  tags = [],
  version = current,
}: {
  Mdx: MdxComponent;
  title: string;
  slug: string;
  tags?: string[];
  version: string;
}) {
  const components = {
    ...baseComponents,
    h1: () => null,
    SectionGuide: (props: React.HTMLAttributes<HTMLDivElement>) => (
      <SectionGuide {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className={classNames(
          props.className,
          "text-sm whitespace-pre-wrap leading-relaxed bg-gray-100 dark:bg-blue-darkest p-6 rounded-2xl mt-2 mb-4 group is-pre xl:py-0 xl:my-0"
        )}
      />
    ),
  };

  return (
    <div
      className={classNames(
        "relative py-6 px-6 md:px-10  leading-relaxed text-blue-black/80 | dark:text-white/80"
      )}
    >
      <BreadCrumbs
        breadCrumbs={[{ title: "Guides", link: "/docs/guides" }, { title }]}
      />
      <span className="text-xs uppercase text-gray-500 dark:text-gray-500">
        Guide
      </span>
      <h1 className="font-title text-3xl mb-1 font-bold | xl:w-1/2 xl:pr-8">
        {title}
      </h1>
      <div className="flex flex-row gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue text-[10px] rounded-sm mb-2 uppercase font-bold text-white dark:text-blue-black px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="hidden bg-gray-100 dark:bg-blue-darkest w-[50vw] h-full left-1/2 top-0 absolute pointer-events-none xl:block" />
      <div className="relative">
        <Mdx components={components} />
      </div>
      <p className="mt-10">
        <a
          className="text-blue"
          href={`https://github.com/api-platform/core/edit/${version}/docs/guides/${slug}.php`}
        >
          You can also help us improve this guide.
        </a>
      </p>
    </div>
  );
}
