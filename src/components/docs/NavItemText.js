import React from 'react';
import PropTypes from 'prop-types';

const NavItemText = ({ docNavItem }) => {
  const { title, level, active, isDirectory } = docNavItem;

  if (0 === level) {
    return (
      <div role="presentation">
        <h2>{title}</h2>
        <i className={`icon-chevron-${active ? 'top' : 'down'}`} />
      </div>
    );
  }

  if (1 === level && isDirectory) {
    return (
      <div role="presentation">
        <h3>{title}</h3>
        <i className={`icon-chevron-${active ? 'top' : 'down'}`} />
      </div>
    );
  }

  return <span>{title}</span>;
};

NavItemText.propTypes = {
  docNavItem: PropTypes.object.isRequired,
};

export default NavItemText;
