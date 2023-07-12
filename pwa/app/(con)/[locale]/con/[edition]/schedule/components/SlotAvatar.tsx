import React from "react";
import Image from "next/image";
import { Speaker } from "types/con";

export default function Avatar({ speakers }: { speakers: Speaker[] }) {
  const getSize = (total: number) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  return (
    <div className="relative w-32 mr-2">
      {speakers.map((speaker, index) => {
        return (
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
