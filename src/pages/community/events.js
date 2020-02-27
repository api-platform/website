import React from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { MeetupEventType } from '../../types';
import Layout from '../../components/Layout';
import EventCard from '../../components/community/EventCard';
import { Grid, GridItem } from '../../components/common/Grid';

const EventsPage = ({ location, data }) => {
  const events = [...data.allEvent.nodes];

  const dateAsc = (a, b) => {
    if (moment(a.local_date, 'YYYY-MM-DD').isBefore(moment(b.local_date, 'YYYY-MM-DD'))) return -1;
    if (moment(a.local_date, 'YYYY-MM-DD').isAfter(moment(b.local_date, 'YYYY-MM-DD'))) return 1;
    return 0;
  };

  const dateDesc = (a, b) => {
    if (moment(a.local_date, 'YYYY-MM-DD').isAfter(moment(b.local_date, 'YYYY-MM-DD'))) return -1;
    if (moment(a.local_date, 'YYYY-MM-DD').isBefore(moment(b.local_date, 'YYYY-MM-DD'))) return 1;
    return 0;
  };

  const upcomingEvents = events.filter(event => 'upcoming' === event.status).sort(dateAsc);

  const pastEvents = events.filter(event => 'past' === event.status).sort(dateDesc);

  return (
    <Layout location={location}>
      <div className="events">
        <Helmet title="Events" />
        <header className="page__header-overlaid bg-blue-extralight">
          <div className="container">
            <h1 className="page__title">
              Our <strong>events</strong>
            </h1>
            <p className="page__subtitle h4-like">
              Meet the community in the next API Platform event organized near you!
            </p>
          </div>
        </header>
        <div className="event__main">
          <section className="events__upcoming">
            <div className="container">
              <Grid>
                {upcomingEvents.map((event, index) => (
                  <GridItem full={0 === index}>
                    <EventCard big={0 === index} event={event} />
                  </GridItem>
                ))}
              </Grid>
            </div>
          </section>
          <section className="events__past">
            <div className="container">
              <h2 className="events-past__title">Past events</h2>
              <Grid>
                {pastEvents.map(event => (
                  <GridItem className="small-event__item">
                    <EventCard event={event} noDesc />
                  </GridItem>
                ))}
              </Grid>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

EventsPage.propTypes = {
  data: PropTypes.shape({
    allEvent: PropTypes.shape({
      nodes: PropTypes.arrayOf({
        MeetupEventType,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    allEvent {
      totalCount
      nodes {
        name
        local_date
        local_time
        venue {
          name
          city
        }
        featured_photo {
          photo_link
        }
        description
        link
        status
      }
    }
  }
`;

export default EventsPage;
