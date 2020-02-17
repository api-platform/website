import React from "react";
import { ContributorType } from "../../types";

const Contributor = ({ contributor }) => (
  <div className="community__contributor">
    <h3 className="contributor__name">{contributor.login}</h3>
    <img
      className="contributor__image"
      src={contributor.avatar}
      alt={contributor.login}
    />
    <div className="contributor__statistic">
      <p className="statistic__value">{contributor.contributions}</p>
      <p className="statistic__title">
        {1 < contributor.contributions ? "contributions" : "contribution"}
      </p>
    </div>
  </div>
);

Contributor.propTypes = {
  contributor: ContributorType.isRequired
};

export default Contributor;
