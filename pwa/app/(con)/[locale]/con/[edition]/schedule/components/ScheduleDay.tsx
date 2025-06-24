"use client";
import React, { useContext } from "react";
import { getConferenceDate, sortByStartDate } from "utils/con";
import { Conference, Day, ExtraConference, Track } from "types/con";
import SlotItem from "./SlotItem";
import Overline from "components/con/common/typography/Overline";
import styles from "./ScheduleDay.module.css";
import classNames from "classnames";
import { LanguageContext } from "contexts/con/LanguageContext";
import { slugify } from "utils";

function ExtraSlotItem({ conference }: { conference: ExtraConference }) {
  const { locale } = useContext(LanguageContext);
  const title =
    typeof conference.title === "string"
      ? conference.title
      : conference.title[locale];

  return (
    <div
      className={classNames(
        "w-full h-full px-1 py-2 flex items-center justify-center uppercase font-bold",
        conference.type === "break" &&
          "border-blue border-dotted border-2 text-blue-dark",
        conference.type === "empty" && "hidden lg:block lg:min-h-[80px]",
        conference.type === "upcoming" && "bg-grey opacity-40"
      )}
    >
      <span className="h6">{title}</span>
    </div>
  );
}

function ScheduleByTrack({
  track: trackId,
  conferences: allConferences,
  tracks,
}: {
  track?: string;
  conferences: Conference[];
  tracks: Track[];
}) {
  const conferences = allConferences
    .filter(
      (conference) => conference.track?.id === trackId || !conference.track
    )
    .sort(sortByStartDate);

  const { locale } = useContext(LanguageContext);

  const track = trackId && tracks.find((t) => t.id === trackId);

  return (
    <div className="grid-cols-1 gap-1 grid bg-white p-2">
      {track ? (
        <div className={styles["track-header"]}>
          <div className="h5" data-value="day">
            {track.title?.[locale]}
          </div>
        </div>
      ) : null}
      {conferences.map((conference) => (
        <div key={`${conference.title} ${conference.start} ${conference.date}`}>
          {conference.type === "conference" ? (
            <SlotItem conference={conference} id="mobile" />
          ) : (
            <ExtraSlotItem conference={conference} />
          )}
        </div>
      ))}
    </div>
  );
}

interface ScheduleDayProps {
  day: Day;
  conferences: Conference[];
  tracks: Track[];
}

export default function ScheduleDay({
  day,
  conferences,
  tracks,
}: ScheduleDayProps) {
  console.log(tracks);
  const { locale } = useContext(LanguageContext);
  const times = conferences.reduce((acc, conference) => {
    if (!acc.includes(conference.start)) acc.push(conference.start);
    if (!acc.includes(conference.end)) acc.push(conference.end);
    return acc;
  }, [] as string[]);

  const daySlug = slugify(day.title?.[locale] || "");

  return day ? (
    <div className="mb-14 last:mb-0" key={day.title?.[locale]}>
      <a
        id={daySlug}
        href={`#${daySlug}`}
        className="block -mt-24 pt-24 outline-none"
      >
        <h2 className="text-white font-title text-4xl font-bold">
          {day.title?.[locale]}
        </h2>
      </a>
      <Overline className="text-white/80 py-2">
        {" "}
        {getConferenceDate(day.date)}
      </Overline>
      {day.tracks ? (
        day.tracks.map((track) => (
          <div key={track} className="lg:hidden">
            <ScheduleByTrack
              conferences={conferences}
              track={track}
              tracks={tracks}
            />
          </div>
        ))
      ) : (
        <div className="lg:hidden">
          <ScheduleByTrack conferences={conferences} tracks={tracks} />
        </div>
      )}
      <div className="bg-white my-5 hidden max-w-5xl mx-auto | lg:block">
        {day.single ? (
          <ScheduleByTrack conferences={conferences} tracks={tracks} />
        ) : (
          <div className="p-2">
            {day.tracks ? (
              <div
                className={classNames(
                  styles["track-header"],
                  styles["schedule-grid"],
                  styles[`schedule-grid-${day.tracks.length}`]
                )}
              >
                {day.tracks.map((trackId) => {
                  const track = tracks.find((t) => t.id === trackId);
                  return (
                    <span
                      key={trackId}
                      style={{
                        gridColumn: `track-${trackId}`,
                        gridRow: "tracks",
                      }}
                      aria-hidden="true"
                    >
                      {track?.title[locale]}
                    </span>
                  );
                })}
              </div>
            ) : null}
            <div
              className={classNames(
                "grid gap-x-1",
                styles["schedule-grid"],
                styles[`schedule-grid-${day.tracks?.length}`]
              )}
            >
              {times.map((time) => (
                <div
                  key={time}
                  className="text-xs"
                  style={{
                    gridColumn: "times",
                    gridRow: `time-${time.replace(":", "")}`,
                  }}
                >
                  {time}
                </div>
              ))}
              {conferences.map((conference) => {
                return (
                  <div
                    id={conference.type}
                    key={`${conference.title} ${conference.start} ${conference.date}`}
                    style={{
                      gridColumn: conference.track
                        ? `track-${conference.track.id}`
                        : `track-1 / track-${day.tracks?.length}-end`,
                      gridRow: `time-${conference.start.replace(
                        ":",
                        ""
                      )}/time-${conference.end.replace(":", "")}`,
                    }}
                  >
                    {conference.type === "conference" ? (
                      <SlotItem conference={conference} id="desktop" />
                    ) : (
                      <ExtraSlotItem conference={conference} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
