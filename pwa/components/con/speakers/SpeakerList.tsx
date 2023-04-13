import React from "react";
import EmptySpeakerCircle from "./EmptySpeakerCircle";
import SpeakerItem from "./SpeakerItem";
import { Speaker } from "types/con";

interface SpeakerListProps {
  speakers: Speaker[];
  max?: number;
}

export default function SpeakerList({ speakers, max }: SpeakerListProps) {
  const sortedSpeakers = speakers.sort((a: Speaker, b: Speaker) => {
    if (a.number > b.number) return 1;
    if (a.number < b.number) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  const speakerList = max ? [...sortedSpeakers].splice(0, max) : sortedSpeakers;

  return (
    <div className="flex flex-wrap justify-center">
      {0 === speakers.length ? (
        <>
          <div className="p-4 mt-8 w-full sm:w-1/2 lg:w-1/3">
            <EmptySpeakerCircle index={1} />
          </div>
          <div className="p-4 mt-8 w-full sm:w-1/2 lg:w-1/3">
            <EmptySpeakerCircle index={2} />
          </div>
          <div className="p-4 mt-8 w-full sm:w-1/2 lg:w-1/3">
            <EmptySpeakerCircle index={3} />
          </div>
        </>
      ) : (
        speakerList.map((speaker) => (
          <div className="p-4 mt-8 w-full sm:w-1/2 lg:w-1/3" key={speaker.name}>
            <SpeakerItem speaker={speaker} />
          </div>
        ))
      )}
    </div>
  );
}
