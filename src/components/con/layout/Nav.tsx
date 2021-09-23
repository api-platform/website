import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '@con/2021/images/logo.svg';
import LogoSpider from '@images/logo_spider.svg';

const Nav: React.ComponentType = () => {
  const [minified, setMinified] = useState('undefined' !== typeof window && 50 > window.scrollY);

  const onScroll = useCallback(() => {
    setMinified(50 > window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <nav
      className={classNames('conf__menu', {
        'with-logo': !minified,
      })}
    >
      <Link to="/con" className="conf__menu-logo">
        <img src={Logo} alt="Api Platform conference" width="180" height="40" />
      </Link>
      <Link to="/" className="conf__menu-back">
        <div className="back__circle">
          <img
            className="back__spider"
            src={LogoSpider}
            alt="Back to API Platform website"
            title="Back to API Platform website"
            width="50"
            height="29"
          />
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
