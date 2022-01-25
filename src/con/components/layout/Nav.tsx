import React, { useContext, useState, useCallback, useEffect } from 'react';
import { navigate } from 'gatsby';
import classNames from 'classnames';
import { useLocation } from '@reach/router';
import Logo from '@con/images/logo.svg';
import useDynamicRefs from '@con/hooks/useDynamicRefs';
import LogoSpider from '@images/logo_spider.svg';
import { ConfContext } from '.';

interface NavLinkProps {
  to?: string;
  withAnchors?: boolean;
  goToAnchorLink: (string) => void;
}

const NavLink: React.ComponentType<NavLinkProps> = ({ withAnchors, to, children, goToAnchorLink }) => {
  const { pathname, hash } = useLocation();
  const { activeLink } = useContext(ConfContext);

  const anchorRegex = /#([^\s]+)/;
  const anchor = withAnchors && to && to.match(anchorRegex)?.[1];

  const fullPathName = `${pathname}${hash}`;
  return anchor ? (
    <a
      className={classNames('conf__menu-item', {
        active: to === (activeLink || fullPathName),
      })}
      onClick={() => goToAnchorLink(anchor)}
      role="button"
      tabIndex={0}
    >
      {children}
    </a>
  ) : (
    <a
      className={classNames('conf__menu-item', {
        active: to === (activeLink || fullPathName),
      })}
      href={to}
    >
      {children}
    </a>
  );
};

interface NavProps {
  logoAlwaysVisible?: boolean;
  edition?: string;
}

const Nav: React.ComponentType<NavProps> = ({ logoAlwaysVisible = false, edition }) => {
  const hasScroll = 'undefined' !== typeof window && 50 > window.scrollY;
  const { pathname } = useLocation();
  const { nav } = useContext(ConfContext);
  const isHomePage = [`/con/${edition}/`, `/con/${edition}`].includes(pathname);
  const links = nav.links.filter((link) => !link.mobileOnly);

  const [getRef] = useDynamicRefs();

  const goToAnchorLink = useCallback(
    (section) => {
      const element = getRef(`section-${section}`);
      element?.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [getRef]
  );

  const [minified, setMinified] = useState(hasScroll && !logoAlwaysVisible);

  const onScroll = useCallback(() => {
    setMinified(50 > window.scrollY && !logoAlwaysVisible);
  }, [logoAlwaysVisible]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const onLogoClick = useCallback(() => {
    if (isHomePage) goToAnchorLink('home');
    else navigate(`/con/${edition}/`);
  }, [isHomePage, goToAnchorLink, edition]);

  return (
    <nav
      className={classNames('conf__menu', {
        'with-logo': !minified,
      })}
    >
      <div role="button" tabIndex={0} className="conf__menu-logo" onClick={onLogoClick}>
        <img src={Logo} alt="Api Platform conference" width="180" height="40" />
        {edition ? <div className="conf__menu-edition">{edition}</div> : null}
      </div>
      <a href={nav.logoLink || '/'} className="conf__menu-back">
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
      {nav.backLink && nav.backLink.to !== pathname ? (
        <>
          <a className="conf__menu-item conf__menu-item-back" href={nav.backLink.to}>
            {`< ${nav.backLink.text}`}
          </a>
          <div className="conf__menu-separator mx-15 text-right" />
        </>
      ) : null}
      {links.map((link) => (
        <NavLink key={link.text} to={link.to} withAnchors={isHomePage} goToAnchorLink={goToAnchorLink}>
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Nav;
