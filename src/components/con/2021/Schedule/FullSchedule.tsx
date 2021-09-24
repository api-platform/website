import React from 'react';
import tracks from '../data/tracks';
import SlotItem from './SlotItem';
import useConferences from '../hooks/useConferences';
import { Track } from '../types';
import { sortByStartDate } from '../utils';

const ScheduleByTrack: React.ComponentType<{ track: Track }> = ({ track }) => {
  const allConferences = useConferences(null, true);
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
        <SlotItem key={`${conference.slug} ${index}`} conference={conference} />
      ))}
      {0 === conferences.length ? <span className="overline">No program yet</span> : null}
    </>
  );
};

const FullSchedule: React.ComponentType = () => (
  <div className="conf__schedule-full">
    {tracks.map((track, index) => (
      <ScheduleByTrack track={track} key={`${track.id} ${index}`} />
    ))}
  </div>
);

export default FullSchedule;
