"use client";
import Button from "components/con/common/Button";
import Overline from "components/con/common/typography/Overline";
import { Conference } from "types/con";
import { getConferenceDate, getConferenceTimes } from "utils/con";
import React, { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function SpeakerConferenceSlot({
  conference,
}: {
  conference: Conference;
}) {
  const { start, end, date, title, url, short, track, day } = conference;
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex flex-col bg-white border-t-4 border-t-blue shadow-md dotted-corner mb-4 last:mb-0 | md:flex-row">
      <div className="bg-blue p-5 flex flex-col items-center justify-center | md:w-52">
        {date ? (
          <>
            {" "}
            <span className="uppercase text-white font-bold font-title">
              {day?.title}
              {track ? (
                <>
                  {day?.title && <br />} {t("conferences.track", { track })}
                </>
              ) : null}
            </span>
            {<Overline>{getConferenceDate(date)}</Overline>}
          </>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 items-start py-5 px-12">
        {date ? (
          <Overline className="text-blue-black/50">
            {getConferenceTimes(date, start, end)}
          </Overline>
        ) : null}
        <h3 className="h6 lined-left font-bold uppercase font-title">
          {title}
        </h3>
        <p className=" my-2 text-sm font-light">{short}</p>
        <Button className="square" size="small" to={url}>
          {t("see_details")}
        </Button>
      </div>
    </div>
  );
}
