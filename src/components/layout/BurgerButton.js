import PropTypes from 'prop-types';
import React from 'react';

const BurgerButton = ({ status, onClick, className }) => (
  <button className={`btn-burger ${status} ${className}`} onClick={onClick}>
    <div className="btn-burger__back">
      <div className="btn-burger__line" />
    </div>
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
