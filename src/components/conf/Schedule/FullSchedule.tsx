import React, { Fragment } from 'react';
import { getFullConferencesByDay } from '../data/api';
import days from '../data/days';
import SlotItem from './SlotItem';

const FullSchedule: React.ComponentType = () => (
  <div className="conf__schedule-full">
    {days.map((day) => (
      <Fragment key={day.index}>
        <div className="schedule__day">
          <div className="h5" data-value="type">
            {day.type}
          </div>
          <div className="h5" data-value="day">{`day ${day.day}`}</div>
          <div className="overline" data-value="date">{`day ${day.date}`}</div>
        </div>
        {getFullConferencesByDay(day.index).map((conference) => (
          <SlotItem key={conference.id} conference={conference} />
        ))}
        {0 === getFullConferencesByDay(day.index).length ? <span className="overline">No program yet</span> : null}
      </Fragment>
    ))}
  </div>
);

export default FullSchedule;
