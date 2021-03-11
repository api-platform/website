import Wave from '@components/common/Wave';
import React, { useRef } from 'react';
import { useIntersection } from 'react-use';
import Logo from '../images/logo.svg';
import Tilleuls from '../images/tilleuls.svg';

const Footer: React.ComponentType = () => {
  const containerRef = useRef(null);
  const intersection = useIntersection(containerRef, {
    rootMargin: '20px 0px 0px',
    threshold: 0,
  });
  const isVisible = intersection?.isIntersecting;

  return (
    <div className="conf__footer" ref={containerRef}>
      <div className="container">
        <img src={Logo} className="footer__logo" alt="Api Platform Conference" />
        <span className="footer__by">an event by</span>
        <a className="footer__tilleuls" href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
          <img src={Tilleuls} alt="Les-Tilleuls.coop" />
        </a>
        <span className="body2 footer__copyright">
          Copyright © 2021{' '}
          <a href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
            Les-tilleuls.coop
          </a>
        </span>
      </div>
      <Wave animated={isVisible} className="footer__wave" />
    </div>
  );
};

export default Footer;
