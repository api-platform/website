import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Grid = ({ left, children, className }) => (
  <div className={classnames(className, 'grid__container', { left })}>{children}</div>
);

Grid.propTypes = {
  left: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Grid.defaultProps = {
  left: false,
  className: '',
};

export const GridItem = ({ className, padding, limitWidth, full, children, autosize }) => (
  <div
    className={classnames(className, 'grid__item', {
      [`p-${padding}`]: !!padding || 0 === padding,
      'no-min': !limitWidth,
      auto: autosize,
      full,
    })}
  >
    {children}
  </div>
);

GridItem.propTypes = {
  full: PropTypes.bool,
  padding: PropTypes.number,
  limitWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  autosize: PropTypes.bool,
};

GridItem.defaultProps = {
  full: false,
  limitWidth: true,
  padding: null,
  className: '',
  autosize: false,
};
