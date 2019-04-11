import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { versions } from '../../../constants';

const doChange = (e, location, currentVersion) => {
  const targetVersion = !Number.isNaN(e.target.value) ? e.target.value : `v${e.target.value}`;
  const path = location.pathname.replace(currentVersion, targetVersion);
  navigate(path);
};

const SwitchVersion = ({ location, currentVersion }) => (
<select onChange={e => doChange(e, location, currentVersion)} value={currentVersion}>
  {versions.map(version => {
    const formattedVersion = Number.isNaN(Number(version)) ? version : `v${version}`;
    return (
      <option key={formattedVersion} value={formattedVersion}>
        {formattedVersion}
      </option>
    );
  })}
</select>
);

export default SwitchVersion;

SwitchVersion.propTypes = {
  location: PropTypes.object.isRequired,
  currentVersion: PropTypes.string.isRequired,
};
