import React from 'react';
import { Conference, Track } from 'src/con/types';
import { sortByStartDate } from '@con/utils';
import SlotItem from './SlotItem';

const ScheduleByTrack: React.ComponentType<{ track: Track; conferences: Conference[]; breaks: Conference[] }> = ({
  track,
  conferences: allConferences,
  breaks: allBreaks,
}) => {
  const conferences = [...allConferences, ...allBreaks]
    .filter((conference) => conference.track === track.id || !conference.track)
    .sort(sortByStartDate);

  return (
    <>
      <div className="schedule__track">
        <div className="h5" data-value="day">{`Track #${track.id}`}</div>
        <div className="overline" data-value="type">
          {track.type}
        </div>
      </div>
      {conferences.map((conference, index) => (
        <SlotItem key={`${conference.slug} ${index}`} conference={conference} />
      ))}
      {0 === conferences.length ? <span className="overline">No program yet</span> : null}
    </>
  );
};

interface FullScheduleProps {
  conferences: Conference[];
  breaks: Conference[];
  tracks: Track[];
}

const FullSchedule: React.ComponentType<FullScheduleProps> = ({ conferences, breaks, tracks }) => (
  <div className="conf__schedule-full">
    {tracks.map((track, index) => (
      <ScheduleByTrack conferences={conferences} breaks={breaks} track={track} key={`${track.id} ${index}`} />
    ))}
  </div>
);

export default FullSchedule;
