import React from 'react';
import { getConferenceDate, sortByStartDate } from '@con/utils';
import { Conference } from '@con/types';
import '@con/styles/index.scss';
import SlotItem from '../2021/Schedule/SlotItem';

const ScheduleByTrack: React.ComponentType<{ track: string; conferences: Conference[] }> = ({
  track,
  conferences: allConferences,
}) => {
  const conferences = allConferences
    .filter((conference) => conference.track === track || !conference.track)
    .sort(sortByStartDate);

  return (
    <div className="schedule-day__grid">
      <div className="schedule-day__track">
        <div className="h5" data-value="day">{`Track #${track}`}</div>
      </div>
      {conferences.map((conference) => (
        <div key={`${conference.title} ${conference.start} ${conference.date}`} className="schedule-day__slot">
          {conference.type ? (
            <div className={`schedule-day__slot-extra schedule-day__slot-extra-${conference.type}`}>
              <span className="h6">{conference.title}</span>
            </div>
          ) : (
            <SlotItem conference={conference} />
          )}
        </div>
      ))}
    </div>
  );
};

interface ScheduleDayProps {
  day: number;
  date: string;
  conferences: Conference[];
}

const ScheduleDay: React.ComponentType<ScheduleDayProps> = ({ day, date, conferences }) => {
  const times = conferences.reduce((acc, conference) => {
    if (!acc.includes(conference.start)) acc.push(conference.start);
    if (!acc.includes(conference.end)) acc.push(conference.end);
    return acc;
  }, []);

  return (
    <div className="schedule__day">
      <h2 className="schedule-day__title">Day {day}</h2>
      <span className="schedule-day__date overline">{getConferenceDate(date)}</span>
      <div className="schedule-day__card schedule__mobile">
        <ScheduleByTrack conferences={conferences} track="EN" />
      </div>
      <div className="schedule-day__card schedule__mobile">
        <ScheduleByTrack conferences={conferences} track="FR" />
      </div>
      <div className="schedule-day__card">
        <div className="schedule-day__tracks">
          <span
            className="schedule-day__track-slot"
            style={{ gridColumn: 'track-EN', gridRow: 'tracks' }}
            aria-hidden="true"
          >
            Track EN
          </span>
          <span
            className="schedule-day__track-slot"
            style={{ gridColumn: 'track-FR', gridRow: 'tracks' }}
            aria-hidden="true"
          >
            Track FR
          </span>
        </div>
        <div className="schedule-day__grid">
          {times.map((time) => (
            <div
              key={time}
              className="schedule-day__time"
              style={{ gridColumn: 'times', gridRow: `time-${time.replace(':', '')}` }}
            >
              {time}
            </div>
          ))}
          {conferences.map((conference) => (
            <div
              key={`${conference.title} ${conference.start} ${conference.date}`}
              className="schedule-day__slot"
              style={{
                gridColumn: conference.track ? `track-${conference.track}` : 'track-EN / track-FR-end',
                gridRow: `time-${conference.start.replace(':', '')}/time-${conference.end.replace(':', '')}`,
              }}
            >
              {conference.type ? (
                <div className={`schedule-day__slot-extra schedule-day__slot-extra-${conference.type}`}>
                  <span className="h6">{conference.title}</span>
                </div>
              ) : (
                <SlotItem conference={conference} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDay;
