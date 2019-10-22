import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import NavItemLink from './NavItemLink';
import NavItemText from './NavItemText';

const NavItemCollapsible = ({ docNavItem, basePath, children }) => {
  const { isLink, active } = docNavItem;

  return (
    <Collapsible
      open={active}
      transitionTime={500}
      easing="ease"
      trigger={
        isLink ? <NavItemLink basePath={basePath} docNavItem={docNavItem} /> : <NavItemText docNavItem={docNavItem} />
      }
    >
      {children}
    </Collapsible>
  );
};

NavItemCollapsible.propTypes = {
  docNavItem: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default NavItemCollapsible;
