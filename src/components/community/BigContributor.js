import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContributorType } from '../../types';

const BigContributor = ({ contributor, size }) => (
  <Link
    to={`/community/contributors/${contributor.login}`}
    className={`card contributor__top transparent p-10 ${size}`}
  >
    <div className="avatar bordered bg-grey-light crop medium">
      <img className="contributor__image" loading="lazy" src={contributor.avatar} alt={contributor.login} />
    </div>
    <div className="card__content">
      <h3 className="card__title">{`#${contributor.position} ${contributor.login}`}</h3>
      <div className="contributor__statistic">
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
