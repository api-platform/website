import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { MeetupEventType, ContributorType } from '../types';
import EventCard from '../components/community/EventCard';
import BigContributor from '../components/community/BigContributor';
import Layout from '../components/Layout';
import Button from '../components/common/Button';
import { Grid, GridItem } from '../components/common/Grid';
import CommunityCommercial from '../images/community_commercial.svg';
import Community1 from '../images/community-01.svg';
import Community2 from '../images/community-02.svg';
import CommunitySupport from '../images/community_support.svg';
import CommunityWrench from '../images/community_wrench.svg';
import CommunitySettings from '../images/community_settings.svg';
import CommunitySecurity from '../images/community_security.svg';
import CommunityTraining from '../images/community_training.svg';
import Puzzle1 from '../images/puzzle-01.svg';
import Puzzle2 from '../images/puzzle-02.svg';
import { confEvent } from './community/events';

const CommunityCard = ({ children, image, title }) => (
  <div className="card community__card">
    <div className="avatar small bg-grey-light crop">
      <img src={image} alt={title} width="100" height="100" />
    </div>
    <h3 className="community-card__title">{title}</h3>
    <div className="community-card__content">{children}</div>
  </div>
);

CommunityCard.propTypes = {
  children: PropTypes.any,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

CommunityCard.defaultProps = {
  children: null,
};

const CommunityPage = ({ location, data }) => {
  const { nodes: upcomingEvents } = data.upcomingEvents;
  const { nodes: pastEvents } = data.pastEvents;

  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const shuffledContributors = [...data.allContributor.nodes].sort(() => 0.5 - Math.random());
    setContributors(shuffledContributors.slice(0, 3));
  }, [data.allContributor.nodes]);

  const events = [confEvent, ...upcomingEvents, ...pastEvents].splice(0, 3);
  return (
    <Layout location={location}>
      <div className="community">
        <Helmet title="Community" />
        <header className="page__header-overlaid bg-blue-extralight">
          <img src={Puzzle1} className="community-header__puzzle left" alt="Community puzzle left" />
          <img src={Puzzle2} className="community-header__puzzle right" alt="Community puzzle right" />
          <div className="container">
            <img src={Community1} className="community-header__image left" alt="Community spider left" />
            <div className="community-header__text">
              <h1 className="page__title">
                API Platform&apos;s <strong className="color-blue-dark">community</strong>
              </h1>
              <p className="page__subtitle h4-like community-header__subtitle color-blue-extradark">
                Interested in <strong>contributing to API Platform</strong> and supporting{' '}
                <strong>our community</strong>? Then you&apos;re in the good place!
                <br />
                There are many ways to get involved and help us.
              </p>
            </div>
            <img src={Community2} className="community-header__image right" alt="Community spider right" />
          </div>
        </header>
        <section className="container community__main">
          <h2 className="accessibility__hidden-block">Support</h2>
          <Grid>
            <GridItem>
              <CommunityCard title="Community support" image={CommunitySupport}>
                <p>
                  Ask questions about API Platform on{' '}
                  <a
                    href="https://stackoverflow.com/questions/tagged/api-platform.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stack Overflow
                  </a>
                  .
                </p>
                <br />
                <p>
                  Chat with the community on the{' '}
                  <a href="https://symfony.com/slack" target="_blank" rel="noopener noreferrer">
                    api-platform channel on Symfony&#39;s Slack
                  </a>
                  .
                </p>
              </CommunityCard>
            </GridItem>
            <GridItem>
              <CommunityCard title="Commercial support" image={CommunityCommercial}>
                <p>
                  <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
                    Les-Tilleuls.coop
                  </a>{' '}
                  provides professional services for API Platform,{' '}
                  <a href="https://mercure.rocks" target="_blank" rel="noopener noreferrer">
                    Mercure
                  </a>
                  ,{' '}
                  <a href="https://mercure.rocks" target="_blank" rel="noopener noreferrer">
                    Vulcain
                  </a>{' '}
                  and Symfony including training, development and API design.
                </p>
                <br />
                <p>
                  <a href="https://les-tilleuls.coop/en#contact" target="_blank" rel="noopener noreferrer">
                    Contact us
                  </a>{' '}
                  for more information.
                </p>
              </CommunityCard>
            </GridItem>
            <GridItem>
              <CommunityCard image={CommunityWrench} title="Contribute to the framework">
                <p>
                  <strong>Improving the documentation</strong> is an excellent way to start getting involved with API
                  Platform.
                </p>
                <br />
                <p>
                  You can also{' '}
                  <a
                    href="https://github.com/api-platform/api-platform/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    report issues
                  </a>
                  , help fix bugs or implement new features by <strong>creating a Pull Request</strong> on GitHub.
                </p>
              </CommunityCard>
            </GridItem>
            <GridItem>
              <CommunityCard image={CommunitySettings} title="Help your local community">
                <p>Help us by connecting with your local community. Here is a few actions you can undertake:</p>
                <br />
                <p>
                  Spread the word on{' '}
                  <a
                    href="https://twitter.com/intent/tweet?screen_name=ApiPlatform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>{' '}
                  or <Link to="/community/events/">attend to the upcoming conferences</Link>.
                </p>
              </CommunityCard>
            </GridItem>
            <GridItem>
              <CommunityCard image={CommunitySecurity} title="Security">
                <p>
                  API Platform is available as part of{' '}
                  <a href="https://tidelift.com/subscription/pkg/packagist-api-platform-core?utm_source=packagist-api-platform-core&utm_medium=referral&utm_campaign=enterprise">
                    the Tidelift Subscription
                  </a>
                  : verified updates for zero-day vulnerabilities, coordinated security responses, and immediate
                  notifications of which of your applications are impacted, with the fix prepared for you!
                </p>
                <br />
                <p>
                  <Link to="/docs/extra/security">Report a security issue.</Link>
                </p>
              </CommunityCard>
            </GridItem>
            <GridItem>
              <CommunityCard image={CommunityTraining} title="Training">
                <p>
                  Be trained by the <strong>API Platform core team</strong>! Sessions available in English and in
                  French.
                </p>{' '}
                <br />
                <p>
                  <a href="https://les-tilleuls.coop/en#contact" target="_blank" rel="noopener noreferrer">
                    Contact Les-Tilleuls.coop
                  </a>{' '}
                  to organize a tailored training course.
                </p>
              </CommunityCard>
            </GridItem>
          </Grid>
        </section>
        <section className="community__contributors">
          <div className="container">
            <h2 className="color-blue">Our contributors</h2>
            <p className="contributors__subtitle">
              Many volunteers contribute back to API Platform. Here are some of them picked randomly:
            </p>
            <Grid className="contributors__grid">
              {contributors.map((contributor) => (
                <GridItem key={contributor.login}>
                  <BigContributor contributor={contributor} size="medium" />
                </GridItem>
              ))}
            </Grid>
            <Button
              empty
              text="See all contributors"
              icon="chevron-right"
              className="community__button small"
              link="/community/contributors"
            />
          </div>
        </section>
        {events.length && (
          <section className="community__events bg-blue-extralight">
            <div className="container">
              <h2 className="community-events__title">Our events</h2>
              <Grid className="community-events__grid">
                {events.map((event) => (
                  <GridItem key={event.link} className="small-event__item">
                    <EventCard event={event} noDesc />
                  </GridItem>
                ))}
              </Grid>
              <Button
                empty
                text="See all events"
                icon="chevron-right"
                className="community__button small"
                link="/community/events/"
              />
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

CommunityPage.propTypes = {
  data: PropTypes.shape({
    upcomingEvents: PropTypes.shape({
      nodes: PropTypes.arrayOf(MeetupEventType),
    }),
    pastEvents: PropTypes.shape({
      nodes: PropTypes.arrayOf(MeetupEventType),
    }),
    allContributor: PropTypes.shape({
      nodes: PropTypes.arrayOf(ContributorType),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    upcomingEvents: allEvent(
      limit: 3
      sort: { fields: local_date, order: ASC }
      filter: { status: { eq: "upcoming" } }
    ) {
      nodes {
        name
        local_date(formatString: "YYYY-MM-DD", locale: "en-EN")
        local_time
        featured_photo {
          photo_link
        }
        status
        description
        link
        visibility
      }
    }
    pastEvents: allEvent(limit: 3, sort: { fields: local_date, order: DESC }, filter: { status: { eq: "past" } }) {
      nodes {
        id
        name
        local_date(formatString: "YYYY-MM-DD", locale: "en-EN")
        local_time
        featured_photo {
          photo_link
        }
        status
        description
        link
        visibility
      }
    }
    allContributor(limit: 100, filter: { login: { ne: "dummy-api-platform" } }) {
      nodes {
        login
        avatar
        contributions
        position
        teams
      }
    }
  }
`;

export default CommunityPage;
