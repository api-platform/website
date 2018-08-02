import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import SupportCommercial from 'images/support_commercial.svg';
import SupportCommunity from 'images/support_community.svg';

const SupportCard = ({ children, image, title }) => (
  <div className="support-card">
    <img className="support-card__image" src={image} alt={title} width="100" height="100" />
    <h3>{title}</h3>
    <div className="support-card__content">{children}</div>
  </div>
);

SupportCard.propTypes = {
  children: PropTypes.any,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SupportCard.defaultProps = {
  children: null,
};

const SupportPage = () => (
  <div className="support">
    <Helmet title="Support" />
    <section className="container">
      <h1>
        Need some <strong>help</strong> ?
      </h1>
      <div className="support__cards">
        <SupportCard title="Community support" image={SupportCommunity}>
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
            <a href="https://symfony.com/slack-invite" target="_blank" rel="noopener noreferrer">
              api-platform channel on Symfony&#39;s Slack
            </a>
            .
          </p>
        </SupportCard>
        <SupportCard title="Commercial support" image={SupportCommercial}>
          <p>
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>{' '}
            provides professional services for API Platform and Symfony including training, development and API design.
          </p>
          <br />
          <p>
            <a href="https://les-tilleuls.coop/en/contact" target="_blank" rel="noopener noreferrer">
              Contact us
            </a>{' '}
            for more information.
          </p>
        </SupportCard>
      </div>
    </section>
  </div>
);

export default SupportPage;
