"use client";
import React, { Fragment, useContext } from "react";
import { ExtraConference } from "types/con";
import { getConferenceTimes } from "utils/con";
import Avatar from "./SlotAvatar";
import Overline from "components/con/common/typography/Overline";
import { LanguageContext } from "contexts/con/LanguageContext";
import TagLabel from "components/con/conferences/TagLabel";

interface SlotItemProps {
  conference: ExtraConference;
  animated?: boolean;
  id?: string;
}

export default function SlotItem({ conference, id }: SlotItemProps) {
  const { start, end, date, url, speakers, tag } = conference;
  const { Translate, locale } = useContext(LanguageContext);

  const title =
    typeof conference.title === "string"
      ? conference.title
      : conference.title[locale];

  return (
    <a
      href={url}
      className="bg-grey flex flex-row items-center text-blue-black overflow-hidden relative w-full h-full px-2 py-3 min-h-[100px] text-left transition-all hover:bg-blue-light/30"
    >
      {speakers.length ? <Avatar id={id} speakers={speakers} /> : null}
      <div className="flex flex-col flex-1">
        <div className="flex flex-row gap-1">
          {tag
            ? tag.split(",").map((t) => <TagLabel key={t} small tag={t} />)
            : null}
        </div>
        <Overline className="opacity-70 lg:hidden">
          {getConferenceTimes(date, start, end)}
        </Overline>
        <h3 className="font-title font-bold lined-left leading-tight">
          {title}
        </h3>
        <div className="text-sm">
          <Translate
            translationKey="conferences.by_speaker"
            translationParams={{
              speaker: (
                <>
                  {speakers.map((speaker, index) => (
                    <Fragment key={speaker.name}>
                      <strong className="font-semibold text-blue-dark">
                        {speaker.name}
                      </strong>
                      {index < speakers.length - 2 && ", "}
                      {index === speakers.length - 2 && " & "}
                    </Fragment>
                  ))}
                </>
              ),
            }}
          />
        </div>
      </div>
    </a>
  );
}
