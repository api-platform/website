import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { MeetupEventType } from '../../types';

const EventInfos = ({ event, big }) => (
  <div className={classNames("card-event__infos", { big })}>
    <p className="card__date">
      <span className="icon-calendar" />
      <span>{`${moment(event.local_date, "YYYY-MM-DD").format("MMM Do YY")}, ${event.local_time}`}</span>
    </p>
    <p>
      <span className="icon-location" />
      <span>{event.venue.name} - {event.venue.city}</span>
    </p>
  </div>
);

EventInfos.propTypes = {
  event: MeetupEventType.isRequired,
  big: PropTypes.bool
};

EventInfos.defaultProps = {
  big: false
}

const EventCard = ({ event, big, noDesc }) => {
  const description = event.description
    .replace(/<p>/gi, "")
    .replace(/<\/p>/gi, "");

  return (
    <div
      className={classNames("card__event card p-10 clickable", {
        big,
        past: moment(event.local_date, "YYYY-MM-DD").isBefore(moment())
      })}
    >
      <div className="event__left-big">
        <img
          className="event__image"
          src={event.featured_photo.photo_link}
          alt={event.name}
        />
        <EventInfos event={event} big />
      </div>
      <div className="card__content">
        <h2 className="card__title">{event.name}</h2>
        {!noDesc && <p
          className="card__description"
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />}
        <EventInfos event={event} />
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: MeetupEventType.isRequired,
  big: PropTypes.bool,
  noDesc: PropTypes.bool
}

EventCard.defaultProps = {
  big: false,
  noDesc: false
}

export default EventCard;
