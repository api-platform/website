import React from 'react';
import spider from '@images/spider_schema.svg';
import Section from '../common/Section';

const Contact: React.ComponentType = () => (
  <Section className="conf__contact" section="contact">
    <div className="contact__card dotted-corner">
      <div className="contact__spider">
        <img src={spider} alt="spider" width="256" height="422" />
      </div>
      <div className="contact__content">
        <span className="h4 contact__title">Questions?</span>
        <a
          className="conf__button small square white"
          href="mailto:events@les-tilleuls.coop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact us!
        </a>
        <div className="overline">or follow us on social networks</div>
        <div className="contact__social">
          <a href="https://mastodon.online/@cooptilleuls" target="_blank" rel="noopener noreferrer">
            <i className="icon-mastodon" />
          </a>
          <a href="https://twitter.com/ApiPlatform" target="_blank" rel="noopener noreferrer">
            <i className="icon-twitter" />
          </a>
          <a href="https://fr.linkedin.com/company/les-tilleuls-coop" target="_blank" rel="noopener noreferrer">
            <i className="icon-linkedin" />
          </a>
        </div>
      </div>
    </div>
  </Section>
);

export default Contact;
