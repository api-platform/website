import React from 'react';
import classNames from "classnames";
import moment from 'moment';
import { MeetupEventType } from '../../types';

const EventCard = ({ event }) => {
  const fulldate = moment(event.local_date, 'YYYY-MM-DD');
  const day = fulldate.date();
  const month = fulldate.format('MMMM');
  const year = fulldate.year();

  return (
    <a
      href={event.link}
      className={classNames("card horizontal card__event p-10 small", {
        past: "past" === event.status
      })}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <div className="card-event__calendar">
        <div className="calendar__month">{month}</div>
        <div className="calendar__day">{day}</div>
        <div className="calendar__year">{year}</div>
      </div>
      <div className="card__content">
        <h3 className="card__title card__autosize">{event.name}</h3>
        <div className="card-event__infos">
          <p>
            <span className="icon-location" />
            <span>{event.venue.name}</span>
          </p>
          <p>
            <span className="icon-clock" />
            <span>{event.local_time}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

EventCard.propTypes = {
  event: MeetupEventType.isRequired,
};

export default EventCard;
