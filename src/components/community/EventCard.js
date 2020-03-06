import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { MeetupEventType } from '../../types';

const EventInfos = ({ event, big }) => (
  <div className={classNames('card-event__infos color-grey-dark', { big })}>
    <p className="card__date text-xs">
      <span className="icon-calendar color-blue" />
      <span>{`${dayjs(event.local_date).format('MMM D, YYYY')} ${event.local_time}`}</span>
    </p>
    <p className="text-xs">
      <span className="icon-location color-blue" />
      <span>
        {event.venue.name} - {event.venue.city}
      </span>
    </p>
  </div>
);

EventInfos.propTypes = {
  event: MeetupEventType.isRequired,
  big: PropTypes.bool,
};

EventInfos.defaultProps = {
  big: false,
};
/* eslint-disable camelcase */
const EventCard = ({ event, big, noDesc }) => {
  const description = event.description.replace(/<p>/gi, '').replace(/<\/p>/gi, '');
  return (
    <a
      href={event.link}
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={classNames('card__event card p-10 clickable', {
        big,
        'full-row': big,
        past: dayjs(event.local_date).isBefore(dayjs()),
      })}
    >
      <div className="event__left-big">
        <img
          className="event__image"
          src={event.featured_photo?.photo_link || '/meetup-placeholder.png'}
          alt={event.name}
        />
        <EventInfos event={event} big />
      </div>
      <div className="card__content">
        <h3 className="card__title">{event.name}</h3>
        {!noDesc && (
          <p
            className="card__description"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        <EventInfos event={event} />
      </div>
    </a>
  );
};
/* eslint-enable camelcase */

EventCard.propTypes = {
  event: MeetupEventType.isRequired,
  big: PropTypes.bool,
  noDesc: PropTypes.bool,
};

EventCard.defaultProps = {
  big: false,
  noDesc: false,
};

export default EventCard;
