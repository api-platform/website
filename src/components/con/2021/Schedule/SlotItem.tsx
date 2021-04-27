import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import Avatar from './SlotAvatar';
import { Conference } from '../types';
import { convertTime } from '../utils';
import useSpeakers from '../hooks/useSpeakers';

interface SlotItemProps {
  conference: Conference;
}

const SlotItem: React.ComponentType<SlotItemProps> = ({ conference }) => {
  const { title, start, end, slug } = conference;
  const speakers = useSpeakers(conference.speakers);

  return (
    <Link to={slug} className={classNames('schedule__slot', { 'no-speaker': !speakers?.length })}>
      {speakers?.length && <Avatar speakers={speakers} />}
      <div className="schedule__slot-infos">
        <span className="overline">
          {start && end ? `${convertTime(start)} - ${convertTime(end)}` : 'Sep, 10 2021'}
        </span>
        <h3 className={classNames('h6 lined', { 'lined-left': speakers?.length })}>{title}</h3>
        {speakers?.length ? (
          <span className="body2">
            {'by '}
            {speakers.map((speaker, index) => (
              <Fragment key={speaker.name}>
                <strong className="slot-speaker">{speaker.name}</strong>
                {index < speakers.length - 1 && ' & '}
              </Fragment>
            ))}
          </span>
        ) : null}
        {1 === speakers.length ? <span className="body2">{speakers[0].job}</span> : null}
      </div>
      <svg className="schedule__slot-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.49 281.49">
        <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
        <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
      </svg>
    </Link>
  );
};

export default SlotItem;
