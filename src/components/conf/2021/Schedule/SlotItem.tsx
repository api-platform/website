import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FullConference, Speaker } from '../types';

const Avatar: React.ComponentType<{ speakers: Speaker[] }> = ({ speakers }) => {
  const getSize = (total) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  return (
    <div className="schedule__slot-avatar">
      {speakers.map((speaker, index) => (
        <div
          className="avatar__circle"
          style={{
            width: `${getSize(speakers.length)}px`,
            height: `${getSize(speakers.length)}px`,
            left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
          }}
        >
          <img src={speaker.image} alt={speaker.name} />
        </div>
      ))}
    </div>
  );
};

interface SlotItemProps {
  conference: FullConference;
}

const SlotItem: React.ComponentType<SlotItemProps> = ({ conference }) => {
  const { speakers, title, time, speakerTitle } = conference;

  const convertTime = (timeRange: string[]) => {
    if (2 > timeRange.length) return 'invalid time range';
    const startTimeParts = timeRange[0].split(':');
    const endTimeParts = timeRange[1].split(':');
    const startDate = dayjs()
      .set('hour', parseInt(startTimeParts?.[0], 10))
      .set('minute', parseInt(startTimeParts?.[1], 10))
      .format('LT');
    const endDate = dayjs()
      .set('hour', parseInt(endTimeParts?.[0], 10))
      .set('minute', parseInt(endTimeParts?.[1], 10))
      .format('LT');
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className={classNames('schedule__slot', { 'no-speaker': !speakers?.length })}>
      {speakers?.length && <Avatar speakers={speakers} />}
      <div className="schedule__slot-infos">
        <span className="overline">{convertTime(time)}</span>
        <h3 className={classNames('h5 lined', { 'lined-left': speakers?.length })}>{title}</h3>
        {speakers?.length ? (
          <span>
            {'by '}
            {speakers.map((speaker, index) => (
              <>
                <a>{speaker.name}</a>
                {index < speakers.length - 1 && ' & '}
              </>
            ))}
          </span>
        ) : null}
        {speakers?.length ? <span>{speakerTitle || speakers[0].job}</span> : null}
      </div>
    </div>
  );
};

export default SlotItem;
