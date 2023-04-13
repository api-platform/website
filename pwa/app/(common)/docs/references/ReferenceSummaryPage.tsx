"use client";
import Heading from "components/common/typography/Heading";
import BreadCrumbs from "components/docs/BreadCrumbs";
import throttle from "lodash.throttle";
import { useCallback, useState } from "react";
import { DocReferenceLink } from "types";
import ReferenceFilterDropdown from "./ReferenceFilterDropdown";
import ReferenceSummaryPart from "./ReferenceSummaryPart";

interface SummaryPageProps {
  summary: { title: string; links: DocReferenceLink[] }[];
}

export default function ReferenceSummaryPage({ summary }: SummaryPageProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | undefined>(undefined);

  const onChangeHandler = ({ target }: { target: HTMLInputElement }) =>
    setQuery(target.value.toLowerCase());

  const debouncedChangeHandler = useCallback(
    throttle(onChangeHandler, 300),
    []
  );

  function isSearched({ title }: { title: string }) {
    return title.toLowerCase().includes(query);
  }

  function isSearchedPart(part: { title: string; links: DocReferenceLink[] }) {
    if (isSearched(part))
      return !!part.links.some((docLink) => !type || docLink.type === type);
    else
      return part.links.some(
        (docLink) => isSearched(docLink) && (!type || docLink.type === type)
      );
  }

  const filteredSummary = summary
    .filter((part) => isSearchedPart(part))
    .map((part) => ({
      title: part.title,
      links: part.links
        .filter((docLink) => isSearched(part) || isSearched(docLink))
        .filter((docLink) => (type ? docLink.type === type : true)),
    }));

  return (
    <>
      <BreadCrumbs breadCrumbs={[{ title: "References" }]} />
      <div className="bg-blue py-4 text-white px-4 sm:px-6 md:px-10 flex flex-col | lg:py-8 | xl:py-12 xl:flex-row xl:justify-between">
        <Heading
          size="xl"
          level="h1"
          className="text-white dark:text-blue-darkest"
        >
          <strong>Reference</strong>
        </Heading>
        <div className="mt-2 flex flex-col gap-2 | md:flex-row md:flex-1 md:items-center | xl:justify-end">
          <ReferenceFilterDropdown value={type} onChange={setType} />
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
        {filteredSummary.map(({ title, links }) => (
          <ReferenceSummaryPart key={title} title={title} links={links} />
        ))}
      </div>
    </>
  );
}
