import React from "react";
import classnames from "classnames";
import styles from "./SpeakerDescription.module.css";
import SpeakerSocialList from "./SpeakerSocialList";
import { Speaker } from "types/con";

interface SpeakerDescriptionProps {
  speaker: Speaker;
}

export default function SpeakerDescription({
  speaker,
}: SpeakerDescriptionProps) {
  const { github, twitter, contentHtml } = speaker;
  const social = github || twitter;

  return (
    <div className="flex flex-col text-center | lg:pl-14 ">
      <div
        className={classnames(styles.content)}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <div className="flex justify-center | lg:justify-start">
        {social && <SpeakerSocialList speaker={speaker} />}
      </div>
    </div>
  );
}
