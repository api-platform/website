import Wave from '@con/common/Wave';
import { Link } from 'gatsby';
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
          <span className="h6 footer__title">Previous editions</span>
          <Link to="/con/2021">2021</Link>
        </div>
        <div className="footer__column">
          <span className="h6 footer__title">Follow us</span>
          <a href="https://mastodon.online/@cooptilleuls" target="_blank" rel="noopener noreferrer">
            <i className="icon-mastodon mr-10" />
            <span>Mastodon</span>
          </a>
          <a href="https://twitter.com/ApiPlatform" target="_blank" rel="noopener noreferrer">
            <i className="icon-twitter mr-10" />
            <span>Twitter</span>
          </a>
          <a href="https://fr.linkedin.com/company/les-tilleuls-coop" target="_blank" rel="noopener noreferrer">
            <i className="icon-linkedin mr-10" />
            <span>LinkedIn</span>
          </a>
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
