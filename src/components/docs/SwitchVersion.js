import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { current, versions } from '../../../constants';
import { getPrefixedVersion } from '../../lib/versionHelper';

versions.push(current);

const doChange = (e, location, currentVersion) => {
  const targetVersion = getPrefixedVersion(e.target.value);

  if (current === targetVersion) {
    const path = location.pathname.replace(currentVersion, '');
    navigate(path);
    return;
  }

  if ('' === currentVersion) {
    const path = location.pathname.replace('docs/', `docs/${targetVersion}/`);
    navigate(path);
    return;
  }

  const path = location.pathname.replace(currentVersion, `${targetVersion}/`);
  navigate(path);
};

const SwitchVersion = ({ location, currentVersion }) => (
  <select
    onChange={e => doChange(e, location, currentVersion)}
    value={'' === currentVersion ? current : currentVersion.slice(0, -1)}
  >
    {versions.map(version => {
      const formattedVersion = getPrefixedVersion(version);
      return (
        <option key={formattedVersion} value={formattedVersion}>
          {formattedVersion.toUpperCase()}
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
