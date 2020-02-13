import React from "react";
import moment from "moment";
import { MeetupEventType } from "../../types";

const EventCard = ({ event }) => {
  const fulldate = moment(event.local_date, "YYYY-MM-DD");
  const day = fulldate.date();
  const month = fulldate.format("MMMM");
  const year = fulldate.year();

  console.log(event);

  return (
    <a
      href={event.link}
      className="card card__event"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-event__calendar">
        <div className="calendar__month">{month}</div>
        <div className="calendar__day">{day}</div>
        <div className="calendar__year">{year}</div>
      </div>
      <div className="card-event__content">
        <h3 className="h5-like card-event__title">{event.name}</h3>
        <div className="card-event__infos">
          <p>
            <i className="icon-location" />
            <span>{`${event.venue.name} - ${event.venue.city}`}</span>
          </p>
          <p>
            <i className="icon-clock" />
            <span>{event.local_time}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

EventCard.propTypes = {
  event: MeetupEventType.isRequired
};

export default EventCard;
