import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const NavItemLink = ({ docNavItem, basePath }) => {
  const { title, uri } = docNavItem;

  return <Link to={basePath + uri}>{title}</Link>;
};

NavItemLink.propTypes = {
  docNavItem: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default NavItemLink;
