import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '../images/logo.svg';
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
    <Link className="conf__menu-item" to={`/conf/#${to}`}>
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
  const { activeLink } = useContext(ConfContext);
  const isHomePage = '/conf/' === location.pathname;
  const [minified, setMinified] = useState(isHomePage && 'home' === activeLink);
  const onScroll = useCallback(() => {
    setMinified(50 > window.scrollY && isHomePage);
  }, [isHomePage]);

  useEffect(() => {
    setMinified(isHomePage && 'home' === activeLink);
  }, [activeLink, isHomePage]);

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
      <div className="conf__menu-logo">
        <img src={Logo} alt="Api Platform conference" width="180" height="40" />
      </div>

      <NavLink anchorLink={isHomePage} to="home">
        Home
      </NavLink>
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
      <BuyButton size="small">Buy tickets</BuyButton>
    </nav>
  );
};

export default Nav;
