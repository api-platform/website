import React from 'react';
import { getConferenceDate, sortByStartDate } from '@con/utils';
import { Conference } from '@con/types';
import '@con/styles/index.scss';
import { getDayByDate } from '@con/data/2022/days';
import SlotItem from '../2021/Schedule/SlotItem';

const ScheduleByTrack: React.ComponentType<{ track?: string; conferences: Conference[] }> = ({
  track,
  conferences: allConferences,
}) => {
  const conferences = allConferences
    .filter((conference) => conference.track === track || !conference.track)
    .sort(sortByStartDate);

  return (
    <div className="schedule-day__grid">
      {track ? (
        <div className="schedule-day__track">
          <div className="h5" data-value="day">{`Track #${track}`}</div>
        </div>
      ) : null}
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
  date: string;
  conferences: Conference[];
}

const ScheduleDay: React.ComponentType<ScheduleDayProps> = ({ date, conferences }) => {
  const times = conferences.reduce((acc, conference) => {
    if (!acc.includes(conference.start)) acc.push(conference.start);
    if (!acc.includes(conference.end)) acc.push(conference.end);
    return acc;
  }, []);

  const day = getDayByDate(date);

  return day ? (
    <div className="schedule__day">
      <h2 className="schedule-day__title">{day.title}</h2>
      <span className="schedule-day__date overline">{getConferenceDate(date)}</span>
      {day.tracks ? (
        day.tracks.map((track) => (
          <div className="schedule-day__card schedule__mobile">
            <ScheduleByTrack conferences={conferences} track={track} />
          </div>
        ))
      ) : (
        <div className="schedule-day__card schedule__mobile">
          <ScheduleByTrack conferences={conferences} />
        </div>
      )}
      {day.single ? (
        <div className="schedule-day__card schedule-day__single">
          <ScheduleByTrack conferences={conferences} />
        </div>
      ) : (
        <div className="schedule-day__card">
          {day.tracks ? (
            <div className="schedule-day__tracks">
              {day.tracks.map((track) => (
                <span
                  className="schedule-day__track-slot"
                  style={{ gridColumn: `track-${track}`, gridRow: 'tracks' }}
                  aria-hidden="true"
                >
                  {`Track ${track}`}
                </span>
              ))}
            </div>
          ) : null}
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
      )}
    </div>
  ) : null;
};

export default ScheduleDay;
