import Wave from '@con/common/Wave';
import React from 'react';
import LogoTilleuls from '@con/common/LogoTilleuls';
import Logo from '../images/logo.svg';

const Footer: React.ComponentType = () => (
  <div className="conf__footer">
    <div className="container">
      <div className="footer__columns">
        <div className="footer__event">
          <img src={Logo} className="footer__logo" alt="Api Platform Conference" />
          <span className="footer__by">an event by</span>
          <a className="footer__tilleuls" href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
            <LogoTilleuls width="100%" />
          </a>
        </div>
        <div className="footer__column">
          <span className="h6 footer__title">The event</span>
          <a href="/con/2021/speakers">Speakers</a>
          <a href="/con/2021/#schedule">Schedule</a>
          <a href="/con/2021/#venue">Venue</a>
          <a href="/con/">Other editions</a>
        </div>
        <div className="footer__column">
          <span className="h6 footer__title">Legal</span>
          <a href="/con/2021/code-of-conduct">Code of conduct</a>
          <a href="/con/2021/faq">FAQ</a>
          <a href="/con/2021/transparency">Revenues transparency</a>
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
