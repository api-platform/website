import React, { useEffect, useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Logo from '../images/logo.svg';
import Tilleuls from '../images/tilleuls.svg';
import Nav from './Nav';

dayjs.extend(localizedFormat);

const Layout: React.ComponentType = ({ children }) => {
  const [hasScroll, setHasScroll] = useState(false);
  const container = useRef(null);
  const onScroll = useCallback(() => {
    setHasScroll(50 < container.current?.scrollTop);
  }, [container]);
  useEffect(() => {
    if (container.current) {
      window.addEventListener('mousewheel', onScroll);
      window.addEventListener('touchmove', onScroll);
    }
    return () => {
      window.removeEventListener('mousewheel', onScroll);
      window.removeEventListener('touchemove', onScroll);
    };
  }, [onScroll]);

  dayjs.extend(localizedFormat);

  return (
    <div className="conf full scrollable" ref={container}>
      <Nav withScroll={hasScroll} />
      {children}
      <div className="conf__footer">
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
      </div>
    </div>
  );
};

export default Layout;
