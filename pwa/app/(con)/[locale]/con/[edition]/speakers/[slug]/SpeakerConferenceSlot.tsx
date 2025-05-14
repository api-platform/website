"use client";
import Button from "components/con/common/Button";
import Overline from "components/con/common/typography/Overline";
import { Conference } from "types/con";
import { getConferenceDate, getConferenceTimes } from "utils/con";
import React, { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import TagLabel from "components/con/conferences/TagLabel";

export default function SpeakerConferenceSlot({
  conference,
}: {
  conference: Conference;
}) {
  const { start, end, date, title, url, short, track, day, tag } = conference;
  const { t, locale } = useContext(LanguageContext);
  return (
    <div className="flex flex-col bg-white border-t-4 border-t-blue shadow-md dotted-corner mb-4 last:mb-0 | md:flex-row">
      <div className="bg-blue p-5 flex flex-col text-center items-center justify-center | md:w-52">
        {date ? (
          <>
            {" "}
            <span className="uppercase text-white font-bold font-title">
              {day?.title?.[locale]}
              {track ? (
                <>
                  {day?.title && <br />} {track.title[locale]}
                </>
              ) : null}
            </span>
            {<Overline>{getConferenceDate(date)}</Overline>}
          </>
        ) : (
          <div className="text-white flex flex-col gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 opacity-60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <span className="uppercase text-white font-bold font-title">
              {t("speakers.no_date")}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 items-start py-5 px-12">
        <div className="lined-left flex flex-col">
          <div className="flex flex-row gap-1">
            {tag
              ? tag.split(",").map((t) => <TagLabel key={t} tag={t} />)
              : null}
          </div>
          <h3 className="h6 font-bold uppercase font-title">{title}</h3>
          {date ? (
            <Overline className="text-blue-black/50">
              {getConferenceTimes(date, start, end)}
            </Overline>
          ) : null}
        </div>
        <p className=" my-2 text-sm font-light">{short}</p>
        <Button className="square" size="small" to={url}>
          {t("see_details")}
        </Button>
      </div>
    </div>
  );
}
