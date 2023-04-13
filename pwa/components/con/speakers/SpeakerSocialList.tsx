import React from "react";
import { Speaker } from "types/con";

interface SpeakerSocialListProps {
  speaker: Speaker;
}

interface SocialIconProps {
  url: string;
  iconName: string;
}

function SocialIcon({ url, iconName }: SocialIconProps) {
  return (
    <a
      className="btn empty relative flex flex-col justify-center items-center p-2 overflow-hidden m-1 text-sm rounded-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={`icon-${iconName}`} />
    </a>
  );
}

export default function SpeakerSocialList({ speaker }: SpeakerSocialListProps) {
  const { github, twitter } = speaker;
  return (
    <div className="flex flex-row justify-center gap-1.5">
      {github && <SocialIcon url={github} iconName="github" />}
      {twitter && <SocialIcon url={twitter} iconName="twitter" />}
    </div>
  );
}
