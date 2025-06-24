import React from "react";
import Image from "next/image";
import { Speaker } from "types/con";
import SpeakerImage2025 from "components/con/speakers/SpeakerImage2025";

export default function Avatar({
  speakers,
  id = "",
}: {
  speakers: Speaker[];
  id?: string;
}) {
  const getSize = (total: number) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  const getSize2025 = (total: number) => {
    if (1 === total) return id === "mobile" ? 80 : 60;
    if (2 === total) return id === "mobile" ? 60 : 40;
    return 50;
  };
  const is2025 = speakers[0].edition === "2025";
  return (
    <div
      className={`relative ${is2025 && id !== "mobile" ? "w-24" : "w-32"} mr-2`}
    >
      {speakers.map((speaker, index) => {
        return is2025 ? (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${getSize2025(speakers.length)}px`,
              height: `${getSize2025(speakers.length)}px`,
              left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
              top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            }}
          >
            <SpeakerImage2025
              speaker={speaker}
              image={speaker.image}
              placeholder={speaker.placeholder}
              circles={false}
              id={id}
            />
          </div>
        ) : (
          <Image
            key={speaker.name}
            alt=""
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={speaker.image}
            width={getSize(speakers.length)}
            height={getSize(speakers.length)}
            style={{
              width: `${getSize(speakers.length)}px`,
              height: `${getSize(speakers.length)}px`,
              left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
              top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            }}
          />
        );
      })}
    </div>
  );
}
