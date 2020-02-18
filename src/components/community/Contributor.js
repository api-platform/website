import React from "react";
import PropTypes from "prop-types";
import { ContributorType } from "../../types";

const Contributor = ({ contributor, size }) => (
  <div className={`community__contributor ${size}`}>
    <div className="contributor__card">
      {"medium" === size && (
        <h3 className="contributor__name">{`${contributor.position}. ${contributor.login}`}</h3>
      )}
      <img
        className="contributor__image"
        loading="lazy"
        src={contributor.avatar}
        alt={contributor.login}
      />
      <div className="contributor__text">
        {"medium" !== size && (
          <h3 className="contributor__name">{`${contributor.position}. ${contributor.login}`}</h3>
        )}
        <div className="contributor__statistic">
          <p className="statistic__value">{contributor.contributions}</p>
          <p className="statistic__title">
            {1 < contributor.contributions ? "contributions" : "contribution"}
          </p>
        </div>
      </div>
    </div>
  </div>
);

Contributor.propTypes = {
  contributor: ContributorType.isRequired,
  size: PropTypes.string
};

Contributor.defaultProps = {
  size: "medium"
};

export default Contributor;
