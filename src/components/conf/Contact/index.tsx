import React from 'react';
import spider from '@images/spider_schema.svg';

const Contact: React.ComponentType = () => (
  <div className="conf__contact">
    <div className="contact__card dotted-corner">
      <div className="contact__spider">
        <img src={spider} alt="spider" width="256" height="422" />
      </div>
      <div className="contact__content">
        <span className="h4 contact__title">Any question ?</span>
        <a className="conf__button small square" href="mailto:events@les-tilleuls.coop">
          Contact us!
        </a>
        <div className="overline">or follow us on social networks</div>
        <div className="contact__social">
          <a href="https://www.facebook.com/les.tilleuls.coop" target="_blank" rel="noopener noreferrer">
            <i className="icon-facebook" />
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
  </div>
);

export default Contact;
