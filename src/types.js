import PropTypes from 'prop-types';

export const MeetupEventType = PropTypes.shape({
  local_date: PropTypes.string,
  local_time: PropTypes.string,
  name: PropTypes.string,
  venue: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  }),
  featured_photo: PropTypes.shape({
    photo_link: PropTypes.string,
  }),
  status: PropTypes.string,
  link: PropTypes.string,
});

export const ContributorType = PropTypes.shape({
  login: PropTypes.string,
  avatar: PropTypes.string,
  profile_url: PropTypes.string,
  id: PropTypes.string,
  contributions: PropTypes.number,
  project: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }),
  position: PropTypes.number,
});
