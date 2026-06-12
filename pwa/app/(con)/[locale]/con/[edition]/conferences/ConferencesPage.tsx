"use client";
import React, { Fragment, useContext, useState } from "react";
import SectionTitle from "components/con/common/typography/SectionTitle";
import { Conference, Day, Track } from "types/con";
import { LanguageContext } from "contexts/con/LanguageContext";
import styles from "./conferencesPage.module.css";
import SpeakerImage2025 from "components/con/speakers/SpeakerImage2025";
import SpeakerImage from "components/con/speakers/SpeakerImage";
import classNames from "classnames";
import { getConferenceDate } from "utils/con";
import Link from "next/link";
import TagLabel from "components/con/conferences/TagLabel";
import ScheduleDay from "../schedule/components/ScheduleDay";

type ViewMode = "list" | "agenda";

interface ConferencesProps {
  conferences: Conference[];
  scheduleConferences: Conference[];
  tracks: Track[];
  edition: string;
  days: Day[];
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}) {
  const { t } = useContext(LanguageContext);
  const options: { value: ViewMode; label: string; icon: JSX.Element }[] = [
    {
      value: "list",
      label: t("conferences.view_list"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      ),
    },
    {
      value: "agenda",
      label: t("conferences.view_agenda"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm ring-1 ring-white/20"
    >
      {options.map((option) => {
        const isActive = view === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={classNames(
              "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-title font-bold uppercase tracking-wide transition-colors duration-200",
              isActive
                ? "bg-white text-blue-black shadow-sm"
                : "text-white/80 hover:text-white"
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SpeakerPageListTemplate({
  conferences,
  scheduleConferences,
  tracks,
  edition,
  days,
}: ConferencesProps) {
  const is2025 = edition === "2025" || edition === "2026";
  const { t, locale, Translate } = useContext(LanguageContext);
  const [view, setView] = useState<ViewMode>("list");
  return (
    <div className="container flex flex-col items-center pt-10 | sm:pt-20">
      <SectionTitle h1 dark>
        <Translate translationKey="conferences.title" />
      </SectionTitle>
      <div className="flex justify-center pb-10">
        <ViewToggle view={view} onChange={setView} />
      </div>
      {view === "agenda" ? (
        <div className="w-full pb-36 text-center">
          {days.map((day: Day) => (
            <ScheduleDay
              key={day.title?.[locale]}
              day={day}
              tracks={tracks}
              conferences={scheduleConferences.filter(
                (conference) => conference.date === day.date
              )}
            />
          ))}
        </div>
      ) : (
        <div className="pb-36 text-white max-w-5xl mx-auto">
          <div className="flex flex-col gap-12">
            {conferences.map((conference, i) => {
              const day = days.find((day: Day) => day.date === conference.date);
              return (
                <div
                  key={conference.title}
                  className="flex flex-col-reverse md:flex-row text-center md:text-left gap-4 md:gap-12 bg-white p-4 pt-8 sm:p-8 text-blue-black relative"
                >
                  <div
                    id={conference.slug}
                    className="absolute left-2 top-2 pt-20 -mt-20"
                  >
                    <Link href={`#${conference.slug}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-4 items-center w-full md:w-40 pt-12 md:py-12 text-center">
                    {conference.speakers.map((speaker, index) => {
                      return is2025 ? (
                        <div
                          className={classNames(
                            conference.speakers.length === 1 && "w-36 h-36",
                            conference.speakers.length === 2 &&
                              "w-24 h-24 -ml-8",
                            conference.speakers.length === 3 &&
                              "w-20 h-20 -ml-10",
                            index === 1 &&
                              "-translate-y-1/2 translate-x-1/3 z-10 -mb-12",
                            index === 2 &&
                              "-translate-y-1/2 translate-x-24 z-10 -mb-10"
                          )}
                        >
                          <SpeakerImage2025
                            speaker={speaker}
                            image={speaker.image}
                            placeholder={speaker.placeholder}
                          />
                        </div>
                      ) : (
                        <div
                          className={classNames(
                            conference.speakers.length === 1 && "w-36 h-36",
                            conference.speakers.length === 2 &&
                              "w-24 h-24 -ml-8",
                            conference.speakers.length === 3 &&
                              "w-20 h-20 -ml-10",
                            index === 1 &&
                              "-translate-y-1/2 translate-x-1/3 z-10 -mb-12",
                            index === 2 &&
                              "-translate-y-1/2 translate-x-2/3 z-10 -mb-10"
                          )}
                        >
                          <SpeakerImage
                            image={speaker.image}
                            placeholder={speaker.placeholder}
                            alt={speaker.name}
                          />
                        </div>
                      );
                    })}
                    <div className="text-sm">
                      <Translate
                        translationKey="conferences.by_speaker"
                        translationParams={{
                          speaker: (
                            <>
                              {conference.speakers.map((speaker, index) => (
                                <Fragment key={speaker.name}>
                                  <Link
                                    href={speaker.url}
                                    className="font-semibold text-blue-dark"
                                  >
                                    {speaker.name}
                                  </Link>
                                  {index < conference.speakers.length - 2 &&
                                    ", "}
                                  {index === conference.speakers.length - 2 &&
                                    " & "}
                                </Fragment>
                              ))}
                            </>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 items-center md:items-start">
                    <div className="flex flex-row gap-1">
                      {conference.tag
                        ? conference.tag
                            .split(",")
                            .map((t) => <TagLabel key={t} small tag={t} />)
                        : null}
                    </div>
                    <h2 className="font-title font-bold text-2xl lined-blue lined-center md:after:left-0 md:after:translate-x-0">
                      {conference.title}
                    </h2>
                    <>
                      {day ? (
                        <p className="text-blue-dark uppercase font-light text-lg relative font-title leading-none">
                          <strong className="font-bold">
                            {day.title?.[locale]}
                          </strong>
                          {conference.track
                            ? ` - ${conference.track.title?.[locale]}`
                            : null}
                        </p>
                      ) : null}
                      {conference.date ? (
                        <p className="text-sm font-title">
                          {getConferenceDate(
                            conference.date,
                            conference.start,
                            conference.end
                          )}
                        </p>
                      ) : null}
                    </>
                    {conference.description ? (
                      <div
                        className={classNames(
                          "font-light leading-relaxed mt-4 text-justify md:text-left",
                          styles.description
                        )}
                        dangerouslySetInnerHTML={{
                          __html: conference.description.replaceAll(
                            "h2>",
                            "h3>"
                          ),
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
