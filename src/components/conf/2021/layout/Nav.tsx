import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '../images/logo.svg';

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

      <Link className="conf__menu-item" to="/" activeClassName="active">
        Home
      </Link>
      <Link className="conf__menu-item" to="/" activeClassName="active">
        Speakers
      </Link>
      <Link className="conf__menu-item" to="/" activeClassName="active">
        Schedule
      </Link>
      <Link className="conf__menu-item" to="/" activeClassName="active">
        Venue
      </Link>
      <Link className="conf__menu-item" to="/" activeClassName="active">
        Pricing
      </Link>
      <Link className="conf__button small" to="/" activeClassName="active">
        Buy ticket
      </Link>
    </nav>
  );
};

export default Nav;
