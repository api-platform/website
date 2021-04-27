import React from 'react';
import tracks from '../data/tracks';
import SlotItem from './SlotItem';
import useConferences from '../hooks/useConferences';
import { Track } from '../types';

const ScheduleByTrack: React.ComponentType<{ track: Track }> = ({ track }) => {
  const allConferences = useConferences();
  const conferences = allConferences.filter((conference) => conference.track === track.id);

  return (
    <>
      <div className="schedule__track">
        <div className="h5" data-value="day">{`Track #${track.id}`}</div>
        <div className="overline" data-value="type">
          {track.type}
        </div>
      </div>
      {conferences.map((conference) => (
        <SlotItem key={conference.slug} conference={conference} />
      ))}
      {0 === conferences.length ? <span className="overline">No program yet</span> : null}
    </>
  );
};

const FullSchedule: React.ComponentType = () => (
  <div className="conf__schedule-full">
    {tracks.map((track) => (
      <ScheduleByTrack track={track} key={track.id} />
    ))}
  </div>
);

export default FullSchedule;
