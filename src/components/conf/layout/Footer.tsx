import Wave from '@components/conf/common/Wave';
import React from 'react';
import Logo from '../images/logo.svg';
import Tilleuls from '../images/tilleuls.svg';

const Footer: React.ComponentType = () => (
  <div className="conf__footer">
    <div className="container">
      <img src={Logo} className="footer__logo" alt="Api Platform Conference" />
      <span className="footer__by">an event by</span>
      <a className="footer__tilleuls" href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
        <img src={Tilleuls} alt="Les-Tilleuls.coop" width="100" height="100" />
      </a>
      <span className="body2 footer__copyright">
        Copyright © 2021{' '}
        <a href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
          Les-tilleuls.coop
        </a>
      </span>
    </div>
    <Wave className="footer__wave" />
  </div>
);

export default Footer;
