import React from 'react';
import dayjs from 'dayjs';
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
    if (dayjs(a.local_date).isBefore(dayjs(b.local_date))) return -1;
    if (dayjs(a.local_date).isAfter(dayjs(b.local_date))) return 1;
    return 0;
  };

  const dateDesc = (a, b) => {
    if (dayjs(a.local_date).isAfter(dayjs(b.local_date))) return -1;
    if (dayjs(a.local_date).isBefore(dayjs(b.local_date))) return 1;
    return 0;
  };

  const upcomingEvents = events.filter(event => dayjs(event.local_date).isAfter(dayjs())).sort(dateAsc);

  const pastEvents = events.filter(event => !dayjs(event.local_date).isAfter(dayjs())).sort(dateDesc);

  return (
    <Layout location={location}>
      <div className="events">
        <Helmet title="Events" />
        <header className="page__header-overlaid bg-blue-extralight">
          <div className="container">
            <h1 className="page__title color-blue-extradark">
              Our <strong className="color-blue-dark">events</strong>
            </h1>
            <p className="page__subtitle h4-like">
              Meet the community in the next API Platform event organized near you!
            </p>
          </div>
        </header>
        <div className="event__main">
          {!!upcomingEvents.length && (
            <section className="events__upcoming">
              <h2 className="accessibility__hidden-block">Upcoming events</h2>
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
          )}
          <section className="events__past">
            <div className="container">
              <h2 className={upcomingEvents.length ? 'events-past__title' : 'accessibility__hidden-block'}>
                Past events
              </h2>
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
      nodes: PropTypes.arrayOf(MeetupEventType),
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
