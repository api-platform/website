"use client";
import React, { useContext } from "react";
import classNames from "classnames";
import { Conference, Speaker } from "types/con";
import Overline from "components/con/common/typography/Overline";
import Link from "components/common/Link";
import SpeakerImage from "components/con/speakers/SpeakerImage";
import Button from "components/con/common/Button";
import { LanguageContext } from "contexts/con/LanguageContext";
import SpeakerImage2025 from "components/con/speakers/SpeakerImage2025";

interface SpeakerProps {
  conference: Conference;
}

const ConferenceSpeaker = ({ conference }: SpeakerProps) => {
  const { speakers } = conference;
  const { t } = useContext(LanguageContext);

  return (
    <div className="relative z-0 w-11/12 max-w-sm | sm:w-4/5 | md:w-80 md:sticky md:top-20 md:mt-5">
      {speakers.map((speaker: Speaker) => {
        const { name, job, company, image, placeholder, url } = speaker;
        return (
          <>
            <div
              key={speaker.name}
              className={classNames(
                "bg-blue-gradient bg-blue text-center px-5 py-5 border-b-2 border-dotted border-b-white/50 last:border-b-0 group hover:bg-blue-dark transition-colors",
                speakers.length === 1 && "md:hover:bg-blue md:pt-10 md:pb-5"
              )}
            >
              <Link
                href={url}
                className={classNames(
                  "flex flex-row items-center",
                  speakers.length === 1 && "md:flex-col"
                )}
              >
                <div
                  className={classNames(
                    "w-20 h-20 relative",
                    speakers.length === 1 && "md:mx-auto md:w-60 md:h-60"
                  )}
                >
                  {conference.edition === "2025" ? (
                    <SpeakerImage2025
                      speaker={speaker}
                      image={image}
                      placeholder={placeholder}
                    />
                  ) : (
                    <SpeakerImage image={image} placeholder={placeholder} />
                  )}
                </div>

                <div
                  className={classNames(
                    "text-inherit uppercase font-title ml-5 flex-1 transition-colors group-hover:text-white",
                    speakers.length === 1 &&
                      "md:mt-7 md:ml-0 md:group-hover:text-blue-black"
                  )}
                >
                  <span
                    className={classNames(
                      "inline-block leading-tight font-semibold text-lg",
                      speakers.length === 1 && "md:text-xl"
                    )}
                  >
                    {name}
                  </span>
                  <Overline className="text-white lined-center lined-white/50">
                    {job}
                    <br />
                    {company ? (
                      <>
                        @ <strong className="font-normal">{company}</strong>
                      </>
                    ) : null}
                  </Overline>
                </div>
              </Link>
              {speakers.length === 1 && (
                <Button
                  className="mt-5 white square hidden md:inline-block"
                  size="small"
                  to={speaker.url}
                >
                  {t("conferences.see_speaker_details")}
                </Button>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ConferenceSpeaker;
