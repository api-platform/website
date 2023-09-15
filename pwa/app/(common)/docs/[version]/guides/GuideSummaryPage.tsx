"use client";
import Heading from "components/common/typography/Heading";
import BreadCrumbs from "components/docs/BreadCrumbs";
import throttle from "lodash.throttle";
import { useCallback, useState } from "react";
import GuideFilterDropdown from "./GuideFilterDropdown";
import GuideSummaryPart from "./GuideSummaryPart";

interface GuidesPageProps {
  guides: { title: string; link: string; tags: string[] | undefined }[];
}

export default function GuideSummaryPage({ guides }: GuidesPageProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | undefined>(undefined);

  const onChangeHandler = ({ target }: { target: HTMLInputElement }) =>
    setQuery(target.value.toLowerCase());

  const debouncedChangeHandler = useCallback(
    throttle(onChangeHandler, 300),
    []
  );

  const isSearched = (title: string) => {
    return title?.toLowerCase().includes(query);
  };

  const isSearchedPart = (guide: {
    title: string;
    link: string;
    tags: string[] | undefined;
  }) => {
    if (isSearched(guide.title)) {
      return guide.tags?.some((guideTag) => !tag || guideTag === tag.toLowerCase());
    } else {
      return guide.tags?.some((guideTag) => isSearched(guide.title) && (!tag || guideTag === tag.toLowerCase()));
    }
  };

  const filteredGuides = guides.filter((guide) => isSearchedPart(guide));

  return (
    <>
      <BreadCrumbs breadCrumbs={[{ title: "Guides" }]} />
      <div className="bg-blue py-4 text-white px-4 sm:px-6 md:px-10 flex flex-col | lg:py-8 | xl:py-12 xl:flex-row xl:justify-between">
        <Heading
          size="xl"
          level="h1"
          className="text-white dark:text-blue-darkest"
        >
          <strong>Guides</strong>
        </Heading>
        <div className="mt-2 flex flex-col gap-2 | md:flex-row md:flex-1 md:items-center | xl:justify-end">
          <GuideFilterDropdown value={tag} onChange={setTag} />
          <div className="relative inline-flex text-blue h-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              className="pl-12 w-full bg-white rounded-[14px] appearance-none py-2 pr-4 text-gray-500 leading-tight focus:outline-none  focus:text-blue focus:bg-white/90 | dark:bg-blue-darkest dark:focus:bg-blue-darkest/80"
              onChange={debouncedChangeHandler}
              type="search"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="px-8 pt-4 pb-12">
        {filteredGuides.map(({ title, link }) => (
          <GuideSummaryPart key={title} title={title} link={link} />
        ))}
      </div>
    </>
  );
}
