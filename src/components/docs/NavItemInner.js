import PropTypes from 'prop-types';
import React from 'react';
import NavItemCollapsible from './NavItemCollapsible';
import NavItemLink from './NavItemLink';
import NavItemText from './NavItemText';
import NavItem from './NavItem';

const NavItemInner = ({ docNavItem, basePath }) => {
  const { hasSubLevels, children, isLink, isAnchor, level, active } = docNavItem;

  if (!hasSubLevels || isAnchor) {
    // Prevent sub-anchors to be rendered
    return isLink ? (
      <NavItemLink basePath={basePath} docNavItem={docNavItem} />
    ) : (
      <NavItemText docNavItem={docNavItem} />
    );
  }

  return (
    <NavItemCollapsible basePath={basePath} docNavItem={docNavItem}>
      <ul data-level={level + 1} data-is-active={active} data-is-link={isLink}>
        {children.map(child => (
          <NavItem key={child.uri} docNavItem={child} basePath={basePath} />
        ))}
      </ul>
    </NavItemCollapsible>
  );
};

NavItemInner.propTypes = {
  docNavItem: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default NavItemInner;
