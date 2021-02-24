import { Link } from 'gatsby';
import React from 'react';

const Nav: React.ComponentType = () => (
  <nav className="conf__menu">
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

export default Nav;
