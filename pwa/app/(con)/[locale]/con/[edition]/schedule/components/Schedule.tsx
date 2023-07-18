"use client";
import SectionTitle from "components/con/common/typography/SectionTitle";
import { Conference, Day, Track } from "types/con";
import ScheduleDay from "./ScheduleDay";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function Schedule({
  days,
  conferences,
  tracks,
}: {
  days: Day[];
  conferences: Conference[];
  tracks: Track[];
}) {
  const { Translate, locale } = useContext(LanguageContext);

  return (
    <div className="relative pt-8 pb-40">
      <div className="container">
        <SectionTitle h1 dark>
          <Translate translationKey="schedule.title" />
        </SectionTitle>
        <div className="text-center pt-10">
          {days.map((day: Day) => {
            return (
              <ScheduleDay
                key={day.title?.[locale]}
                day={day}
                tracks={tracks}
                conferences={conferences.filter(
                  (conference) => conference.date === day.date
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
