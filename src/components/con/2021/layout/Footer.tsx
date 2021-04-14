import Wave from '@components/con/2021/common/Wave';
import { Link } from 'gatsby';
import React from 'react';
import Logo from '../images/logo.svg';
import Tilleuls from '../images/tilleuls.svg';

const Footer: React.ComponentType = () => (
  <div className="conf__footer">
    <div className="container">
      <div className="footer__columns">
        <div className="footer__event">
          <img src={Logo} className="footer__logo" alt="Api Platform Conference" />
          <span className="footer__by">an event by</span>
          <a className="footer__tilleuls" href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
            <img src={Tilleuls} alt="Les-Tilleuls.coop" width="100" height="100" />
          </a>
        </div>
        <div className="footer__column">
          <span className="h6 footer__title">The event</span>
          <Link to="/con/2021/speakers">Speakers</Link>
          <Link to="/con/2021/#schedule">Schedule</Link>
          <Link to="/con/2021/#venue">Venue</Link>
          <Link to="/con/2021/#pricing">Pricing</Link>
        </div>
        <div className="footer__column">
          <span className="h6 footer__title">Legal</span>
          <Link to="/con/2021/code-of-conduct">Code of conduct</Link>
          <Link to="/con/2021/faq">FAQ</Link>
          <Link to="/con/2021/transparency">Revenues transparency</Link>
        </div>
      </div>
      <span className="body2 footer__copyright">
        Copyright © 2021{' '}
        <a href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
          Les-Tilleuls.coop
        </a>
      </span>
    </div>
    <Wave className="footer__wave" />
  </div>
);

export default Footer;
