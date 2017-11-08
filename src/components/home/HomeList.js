import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HomeList = ({ data, className }) => (
  <div className={classNames('home__list', className)}>
    {data.map((item, index) => (
      <div key={`point${index}`} className="home__point">
        <i className="icon-circle-chevron-right point__arrow" />
        <p className="point__text" dangerouslySetInnerHTML={{ __html: item }} />
      </div>
    ))}
  </div>
);

HomeList.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};

HomeList.defaultProps = {
  data: [],
  className: null,
};

export default HomeList;
