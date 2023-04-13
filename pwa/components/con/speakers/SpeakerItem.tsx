import React from "react";
import classNames from "classnames";
import { Speaker } from "types/con";
import SpeakerSocialList from "./SpeakerSocialList";
import SpeakerImage from "./SpeakerImage";
import Overline from "components/con/common/typography/Overline";
import Link from "next/link";

interface SpeakerProps {
  speaker: Speaker;
  social?: boolean;
  hoverable?: boolean;
  minified?: boolean;
}

export default function SpeakerItem({
  speaker,
  hoverable = true,
  social = true,
  minified = false,
}: SpeakerProps) {
  const { name, job, company, github, twitter, image, placeholder, url } =
    speaker;
  const withSocial = social && (github || twitter);

  return (
    <div
      className={classNames(
        "flex flex-col text-center",
        minified && "w-full max-w-xs"
      )}
    >
      <Link
        href={url}
        className={classNames(
          hoverable ? "group cursor-pointer" : "cursor-default",
          minified ? "flex flex-row items-center" : "text-center"
        )}
      >
        <div
          className={classNames(minified ? "w-20 h-20" : "mx-auto w-60 h-60")}
        >
          <SpeakerImage image={image} placeholder={placeholder} />
        </div>

        <div
          className={classNames(
            "text-inherit uppercase font-title transition-all group-hover:-translate-y-2",
            minified ? "ml-5 flex-1" : "mt-7"
          )}
        >
          <span
            className={classNames(
              "inline-block leading-tight font-semibold transition-all group-hover:text-blue",
              minified ? "text-lg" : "text-xl"
            )}
          >
            {name}
          </span>
          <Overline className="lined-center opacity-70 transition-all after:transition-all group-hover:translate-y-5 group-hover:after:bottom-[calc(100%+10px)] group-hover:after:scale-x-75">
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
      {withSocial && !minified ? <SpeakerSocialList speaker={speaker} /> : null}
    </div>
  );
}
