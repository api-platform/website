import React from 'react';
import { getConferenceDate, getConferenceTimes } from '@con/utils';
import Button from '@con/components/common/Button';
import { Conference, Track } from 'src/con/types';
import { getDayByDate } from '@con/data/2022/days';

const SpeakerConferenceSlot: React.ComponentType<{ conference: Conference; tracks: Track[] }> = ({ conference }) => {
  const day = getDayByDate(conference.date);
  const { start, end, date, title, slug, short, track } = conference;
  return (
    <div className="speaker__conference-slot dotted-corner">
      <div className="conference__track">
        {date ? (
          <>
            {' '}
            <span className="h6">
              {day.title}
              {track ? (
                <>
                  <br /> {`Track #${track}`}
                </>
              ) : null}
            </span>
            <span className="overline">{getConferenceDate(date)}</span>
          </>
        ) : null}
      </div>
      <div className="conference__content">
        <span className="overline">{getConferenceTimes(date, start, end)}</span>
        <h3 className="h6 lined lined-left">{title}</h3>
        <p>{short}</p>
        <Button className="square" size="small" to={slug}>
          See details
        </Button>
      </div>
    </div>
  );
};

export default SpeakerConferenceSlot;
