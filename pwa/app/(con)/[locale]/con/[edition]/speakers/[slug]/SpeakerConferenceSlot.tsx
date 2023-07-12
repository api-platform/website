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
        ) : null}
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
