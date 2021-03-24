import React, { Fragment } from 'react';
import { getFullConferencesByTrack } from '../data/api';
import tracks from '../data/tracks';
import SlotItem from './SlotItem';

const FullSchedule: React.ComponentType = () => (
  <div className="conf__schedule-full">
    {tracks.map((track) => (
      <Fragment key={track.index}>
        <div className="schedule__day">
          <div className="h5" data-value="type">
            {track.type}
          </div>
          <div className="h5" data-value="day">{`Track #${track.index}`}</div>
          <div className="overline" data-value="date">
            {track.date}
          </div>
        </div>
        {getFullConferencesByTrack(track.index).map((conference) => (
          <SlotItem key={conference.id} conference={conference} />
        ))}
        {0 === getFullConferencesByTrack(track.index).length ? <span className="overline">No program yet</span> : null}
      </Fragment>
    ))}
  </div>
);

export default FullSchedule;
