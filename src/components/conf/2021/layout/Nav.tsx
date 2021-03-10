import React, { useContext } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '../images/logo.svg';
import { ConfContext } from '../../../../pages/conf/2021/index';

const NavLink: React.ComponentType<{ to: string }> = ({ to, children }) => {
  const { activeLink } = useContext(ConfContext);
  return (
    <Link
      className={classNames('conf__menu-item', {
        active: to === activeLink,
      })}
      to={`#${to}`}
      activeClassName="active"
    >
      {children}
    </Link>
  );
};

const Nav: React.ComponentType<{ withScroll: boolean }> = ({ withScroll }) => {
  return (
    <nav
      className={classNames('conf__menu', {
        'with-logo': withScroll,
      })}
    >
      <div className="conf__menu-logo">
        <img src={Logo} alt="Api Platform conference" />
      </div>

      <NavLink to="home">Home</NavLink>
      <NavLink to="speakers">Speakers</NavLink>
      <NavLink to="schedule">Schedule</NavLink>
      <NavLink to="venue">Venue</NavLink>
      <NavLink to="pricing">Pricing</NavLink>
      <Link className="conf__button small" to="/" activeClassName="active">
        Buy ticket
      </Link>
    </nav>
  );
};

export default Nav;
