"use client";
import React, { useContext } from "react";
import { Conference, Day } from "types/con";
import SectionTitle from "components/con/common/typography/SectionTitle";
import ConferenceSpeaker from "./ConferenceSpeaker";
import { getConferenceDate } from "utils/con";
import classNames from "classnames";
import styles from "./conferencePage.module.css";
import { LanguageContext } from "contexts/con/LanguageContext";

interface ConferencePageProps {
  conference: Conference;
  day: Day;
}

const ConferencePageTemplate = ({ conference, day }: ConferencePageProps) => {
  const { title, date, start, end, track, description } = conference;
  const languageContext = useContext(LanguageContext);

  return (
    <div className="container max-w-6xl flex flex-col items-center pt-10 pb-80 before:bg-wave before:absolute before:w-[2000px] before:h-[500px] before:bg-no-repeat before:opacity-30 before:-translate-x-1/2 before:top-[220px] before:left-[65%] | sm:pt-20">
      <div className="text-white text-center mb-20">
        <SectionTitle dark lined h1 small={50 < title.length}>
          <strong>{title}</strong>
        </SectionTitle>
        <>
          {day ? (
            <p className="uppercase font-light text-xl relative">
              <strong className="font-bold">
                {day.title?.[languageContext.locale]}
              </strong>
              {track ? ` - ${track.title?.[languageContext.locale]}` : null}
            </p>
          ) : null}
          {date ? (
            <p className="text-sm font-semibold mt-3">
              {getConferenceDate(date, start, end)}
            </p>
          ) : null}
        </>
      </div>
      <div className="flex flex-col-reverse items-center w-full relative -mb-24 before:bg-grey before:absolute before:w-screen before:h-4/6 before:left-1/2 before:bottom-[50px] before:-translate-x-1/2 | md:flex-row md:items-start">
        <ConferenceSpeaker conference={conference} />
        <div className="bg-white p-12 shadow-md dotted-corner corner-bottom flex-1">
          {description ? (
            <div
              className={classNames(
                "font-light leading-relaxed text-lg",
                styles.description
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConferencePageTemplate;
