import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import classNames from 'classnames';
import Logo from '../images/logo.svg';
import LogoSpider from '../../../../images/logo_spider.svg';
import { ConfContext } from '.';
import BuyButton from '../common/BuyButton';

interface NavLinkProps {
  to: string;
  anchorLink: boolean;
}

const NavLink: React.ComponentType<NavLinkProps> = ({ to, children, anchorLink }) => {
  const { activeLink, goToLink } = useContext(ConfContext);

  return anchorLink ? (
    <a
      className={classNames('conf__menu-item', {
        active: to === activeLink,
      })}
      onClick={() => goToLink(to)}
      role="button"
      tabIndex={0}
    >
      {children}
    </a>
  ) : (
    <Link className="conf__menu-item" to={`/con/2021/#${to}`}>
      {children}
    </Link>
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
  const isHomePage = '/con/2021/' === location.pathname;

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

      <NavLink anchorLink={isHomePage} to="speakers">
        Speakers
      </NavLink>
      <NavLink anchorLink={isHomePage} to="schedule">
        Schedule
      </NavLink>
      <NavLink anchorLink={isHomePage} to="venue">
        Venue
      </NavLink>
      <NavLink anchorLink={isHomePage} to="pricing">
        Pricing
      </NavLink>
      <BuyButton id="nav" size="small">
        Buy tickets
      </BuyButton>
    </nav>
  );
};

export default Nav;
