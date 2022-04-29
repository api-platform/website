import React, { Fragment } from 'react';
import { Conference } from 'src/con/types';
import useSpeakers from '@con/hooks/useSpeakers';
import { getConferenceTimes } from '@con/utils';
import Avatar from './SlotAvatar';

interface SlotItemProps {
  conference: Conference;
}

const SlotItem: React.ComponentType<SlotItemProps> = ({ conference }) => {
  const { title, start, end, date, slug } = conference;
  let speakers = useSpeakers(conference.speakers);

  if (!conference.speakers) speakers = [];
  return speakers.length ? (
    <a href={slug} className="schedule__slot">
      <Avatar speakers={speakers} />
      <div className="schedule__slot-infos">
        <span className="overline">{getConferenceTimes(date, start, end)}</span>
        <h3 className="h6 lined lined-left">{title}</h3>
        <span className="body2">
          {'by '}
          {speakers.map((speaker, index) => (
            <Fragment key={speaker.name}>
              <strong className="slot-speaker">{speaker.name}</strong>
              {index < speakers.length - 1 && ' & '}
            </Fragment>
          ))}
        </span>
        {1 === speakers.length ? <span className="body2">{speakers[0].job}</span> : null}
      </div>
      <svg className="schedule__slot-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.49 281.49">
        <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
        <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
      </svg>
    </a>
  ) : (
    <div className="schedule__slot no-speaker">
      <div className="schedule__slot-infos">
        <span className="overline">{getConferenceTimes(date, start, end)}</span>
        <h3 className="h6 lined">{title}</h3>
      </div>
    </div>
  );
};

export default SlotItem;
