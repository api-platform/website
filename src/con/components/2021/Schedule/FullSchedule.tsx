import React from 'react';
import { Conference, Track } from 'src/con/types';
import { sortByStartDate } from '@con/utils';
import SlotItem from './SlotItem';

const ScheduleByTrack: React.ComponentType<{ track: Track; conferences: Conference[] }> = ({
  track,
  conferences: allConferences,
}) => {
  const conferences = allConferences
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
        <SlotItem animated key={`${conference.slug} ${index}`} conference={conference} />
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

const FullSchedule: React.ComponentType<FullScheduleProps> = ({ conferences, breaks, tracks }) => {
  const allConferences = [...conferences, ...breaks];
  return (
    <div className="conf__schedule-full">
      {tracks.map((track, index) => (
        <ScheduleByTrack conferences={allConferences} track={track} key={`${track.id} ${index}`} />
      ))}
    </div>
  );
};

export default FullSchedule;
