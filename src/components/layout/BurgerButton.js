import PropTypes from 'prop-types';
import React from 'react';

const BurgerButton = ({ status, onClick, className }) => (
  <button className={`btn-burger ${status} ${className}`} onClick={onClick} aria-label="open the menu">
    <span className="btn-burger__back">
      <span className="btn-burger__line" />
    </span>
  </button>
);

BurgerButton.propTypes = {
  status: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

BurgerButton.defaultProps = {
  status: 'burger',
  onClick: null,
  className: '',
};

export default BurgerButton;
