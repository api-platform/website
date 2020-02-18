import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { MeetupEventType, ContributorType } from '../types';
import EventCard from '../components/community/EventCard';
import Contributor from '../components/community/Contributor';
import Layout from '../components/Layout';
import Button from '../components/common/Button';
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

const CommunityCard = ({ children, image, title }) => (
  <div className="card community__card">
    <div className="avatar small grey crop">
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
  const { totalCount: totalEvents, nodes: events } = data.allMeetupEvent;
  const shuffledContributors = [...data.allContributor.nodes].sort(() => 0.5 - Math.random());
  const contributors = shuffledContributors.slice(0, 3);
  return (
    <Layout location={location}>
      <div className="community">
        <Helmet title="Community" />
        <header className="community__header">
          <img src={Puzzle1} className="community-header__puzzle left" alt="Community puzzle left" />
          <img src={Puzzle2} className="community-header__puzzle right" alt="Community puzzle right" />
          <div className="container">
            <img src={Community1} className="community-header__image left" alt="Community spider left" />
            <div className="community-header__text">
              <h1 className="community-header__title">
                Api Platform&apos;s <strong>community</strong>
              </h1>
              <h2 className="h4-like community-header__subtitle">
                Interested in <strong>contributing to API Platform</strong> and supporting{' '}
                <strong>our community</strong>? Then you&apos;re in the good place!
                <br />
                There are many ways to get involved and help us.
              </h2>
            </div>
            <img src={Community2} className="community-header__image right" alt="Community spider right" />
          </div>
        </header>
        <section className="container community__main">
          <div className="grid__container">
            <div className="grid__item">
            <CommunityCard title="Community support" image={CommunitySupport}>
              <p>
                Ask questions about API Platform on{' '}
                <a
                  href="https://stackoverflow.com/questions/tagged/api-platform.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stack Overflow
                </a>{' '}
                using the api-platform.com tag.
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
            </div>
            <div className="grid__item">
            <CommunityCard title="Commercial support" image={CommunityCommercial}>
              <p>
                <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
                  Les-Tilleuls.coop
                </a>{' '}
                provides professional services for API Platform and Symfony including training, development and API
                design.
              </p>
              <br />
              <p>
                <a href="https://les-tilleuls.coop/en/contact" target="_blank" rel="noopener noreferrer">
                  Contact us
                </a>{' '}
                for more information.
              </p>
            </CommunityCard>
            </div>
            <div className="grid__item">
            <CommunityCard image={CommunityWrench} title="Contribute to the framework">
              <p>
                <strong>Improving the documentation</strong> is an excellent way to start getting involved with API
                Platform.
              </p>
              <br />
              <p>
                You can also{' '}
                <a href="https://github.com/api-platform/api-platform/issues" target="_blank" rel="noopener noreferrer">
                  report issues
                </a>
                , help fix bugs or implement new features via <strong>creating a Pull Request</strong>.
              </p>
            </CommunityCard>
            </div><div className="grid__item">
            <CommunityCard image={CommunitySettings} title="Help your local community">
              <p>Help us by connecting with your local community. Here is a few actions you can undertake :</p>
              <br />
              <p>
                Spread the word with{' '}
                <a href="https://twitter.com/search?q=apiplatform&src=typd" target="_blank" rel="noopener noreferrer">
                  social media
                </a>{' '}
                or{' '}
                <a href="https://www.meetup.com/fr-FR/api-platform/" target="_blank" rel="noopener noreferrer">
                  organise a meetup
                </a>{' '}
                (discover the upcoming conferences).
              </p>
            </CommunityCard>
            </div><div className="grid__item">
            <CommunityCard image={CommunitySecurity} title="Security issues">
              <p>
                If you think you have found a security issue,{' '}
                <a href="https://les-tilleuls.coop/en/contact" target="_blank" rel="noopener noreferrer">
                  contact us.
                </a>{' '}
                <br />
                Please do not report security problems publicly.
              </p>{' '}
              <br />
              <p>
                We will disclose details of the issue and credit you after having released a new version including a
                fix.
              </p>
            </CommunityCard></div><div className="grid__item">
            <CommunityCard image={CommunityTraining} title="Training">
              <p>
                You can be trained by <strong>API Platform core team</strong> (2 day sessions in French or English).
              </p>{' '}
              <br />
              <p>
                Les-Tilleuls.coop can also organize tailored training courses:{' '}
                <a href="https://les-tilleuls.coop/en/contact" target="_blank" rel="noopener noreferrer">
                  contact us
                </a>{' '}
                for more informations.
              </p>
            </CommunityCard>
            </div>
          </div>
        </section>
        <section className="community__contributors">
          <div className="container">
            <h2 className="contributors__title">Our contributors</h2>
            <p className="contributors__subtitle">
              Many volunteers contribute back to API Platform. Here are some of them picked randomly:
            </p>
            <div className="contributors__list">
              {contributors.map(contributor => (
                <Contributor contributor={contributor} size="medium" />
              ))}
            </div>
            <Button
              text="See all contributors"
              icon="chevron-right"
              className="btn contributors__button small"
              link="/community/contributors"
            />
          </div>
        </section>
        {totalEvents && (
          <section className="community__events">
            <div className="container">
              <h2 className="community-events__title">Upcoming events</h2>
              <div className="grid__container">
                {events.map(event => (
                  <div className="grid__item p-10">
                  <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

CommunityPage.propTypes = {
  data: PropTypes.shape({
    allMeetupEvent: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf({
        MeetupEventType,
      }),
    }),
    allContributor: PropTypes.shape({
      nodes: PropTypes.arrayOf({
        ContributorType,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    allMeetupEvent {
      totalCount
      nodes {
        name
        local_date
        local_time
        venue {
          name
          city
        }
        description
        link
        visibility
      }
    }
    allContributor {
      nodes {
        id
        login
        avatar
        contributions
        position
      }
    }
  }
`;

export default CommunityPage;
