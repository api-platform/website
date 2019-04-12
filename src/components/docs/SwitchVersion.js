import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { versions } from '../../../constants';
import { getPrefixedVersion } from '../../lib/versionHelper';

const doChange = (e, location, currentVersion) => {
  const targetVersion = getPrefixedVersion(e.target.value);
  const path = location.pathname.replace(currentVersion, targetVersion);
  navigate(path);
};

const SwitchVersion = ({ location, currentVersion }) => (
  <select onChange={e => doChange(e, location, currentVersion)} value={currentVersion}>
    {versions.map(version => {
      const formattedVersion = getPrefixedVersion(version);
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
