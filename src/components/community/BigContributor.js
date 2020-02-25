import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContributorType } from '../../types';

const BigContributor = ({ contributor, size }) => (
  <Link
    to={`/community/contributors/${contributor.login}`}
    className={classnames('card contributor__top transparent p-10', {
      [size]: size,
      'full-row': 'big' === size,
    })}
  >
    <div className="avatar bordered bg-grey-light crop medium">
      <img className="contributor__image" loading="lazy" src={contributor.avatar} alt={contributor.login} />
      <svg version="1.1" viewBox="0 0 520 520" preserveAspectRatio="xMinYMin meet">
        <circle cx="260" cy="260" r="250" />
      </svg>
    </div>
    <div className="card__content">
      <h3 className="card__title color-blue-extradark">{`#${contributor.position} ${contributor.login}`}</h3>
      <div className="contributor__statistic color-blue">
        <p className="statistic__value">{contributor.contributions}</p>
        <p className="statistic__title">{1 < contributor.contributions ? 'contributions' : 'contribution'}</p>
      </div>
    </div>
  </Link>
);

BigContributor.propTypes = {
  contributor: ContributorType.isRequired,
  size: PropTypes.string,
};

BigContributor.defaultProps = {
  size: 'medium',
};

export default BigContributor;
