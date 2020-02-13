import PropTypes from 'prop-types';

/* eslint-disable import/prefer-default-export */
export const MeetupEventType = PropTypes.shape({
  local_date: PropTypes.string,
  local_time: PropTypes.string,
  name: PropTypes.string,
  venue: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  })
});
