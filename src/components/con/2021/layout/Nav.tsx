import React, { useContext, useState, useCallback, useEffect } from 'react';
import { navigate } from 'gatsby';
import classNames from 'classnames';
import { useLocation } from '@reach/router';
import Logo from '../images/logo.svg';
import LogoSpider from '../../../../images/logo_spider.svg';
import { ConfContext } from '.';
import links from '../data/nav';

interface NavLinkProps {
  to?: string;
  anchor?: string;
}

const NavLink: React.ComponentType<NavLinkProps> = ({ to, children, anchor }) => {
  const { activeLink, goToLink } = useContext(ConfContext);
  const { pathname } = useLocation();

  return anchor ? (
    <a
      className={classNames('conf__menu-item', {
        active: anchor === activeLink,
      })}
      onClick={() => goToLink(anchor)}
      role="button"
      tabIndex={0}
    >
      {children}
    </a>
  ) : (
    <a
      className={classNames('conf__menu-item', {
        active: to === pathname,
      })}
      href={to}
    >
      {children}
    </a>
  );
};

interface NavProps {
  location: {
    pathname?: string;
    hash?: string;
  };
}

const Nav: React.ComponentType<NavProps> = ({ location }) => {
  const { goToLink, sectionsVisibles } = useContext(ConfContext);
  const isHomePage = ['/con/2021/', '/con/2021'].includes(location.pathname);

  const [minified, setMinified] = useState(
    isHomePage && 1 === sectionsVisibles.length && sectionsVisibles.includes('home')
  );

  const onScroll = useCallback(() => {
    setMinified(50 > window.scrollY && isHomePage);
  }, [isHomePage]);

  useEffect(() => {
    setMinified(isHomePage && 1 === sectionsVisibles.length && sectionsVisibles.includes('home'));
  }, [sectionsVisibles, isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const onLogoClick = useCallback(() => {
    if (isHomePage) goToLink('home');
    else navigate('/con/2021/');
  }, [isHomePage, goToLink]);

  const isButtonHidden = isHomePage && 1 === sectionsVisibles.length && sectionsVisibles.includes('home');
  return (
    <nav
      className={classNames('conf__menu', {
        'with-logo': !minified,
        'with-button': !isButtonHidden,
      })}
    >
      <div role="button" tabIndex={0} className="conf__menu-logo" onClick={onLogoClick}>
        <img src={Logo} alt="Api Platform conference" width="180" height="40" />
      </div>
      <a href="/" className="conf__menu-back">
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
      </a>
      <a className="conf__menu-item conf__menu-item-back" href="/con">
        {`< Back to current edition`}
      </a>
      <div className="conf__menu-separator mx-15 text-right" />
      {links.map((link) => (
        <NavLink key={link.text} anchor={isHomePage && link.anchor} to={link.to}>
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Nav;
