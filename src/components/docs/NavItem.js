import PropTypes from 'prop-types';
import React from 'react';
import NavItemInner from './NavItemInner';

const NavItem = ({ docNavItem, basePath }) => {
  const { hasSubLevels, title, isLink, isDirectory, isAnchor, level, active } = docNavItem;
  return (
    <li
      data-level={level}
      data-title={title}
      data-is-active={active}
      data-is-link={isLink}
      data-is-directory={isDirectory}
      data-is-anchor={isAnchor}
      data-has-sublevels={hasSubLevels}
    >
      <NavItemInner basePath={basePath} docNavItem={docNavItem} />
    </li>
  );
};

NavItem.propTypes = {
  docNavItem: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default NavItem;
