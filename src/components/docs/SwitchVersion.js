import React from "react";
import PropTypes from 'prop-types';
import {navigate} from 'gatsby'
import {versions} from '../../../constants';

const doChange = (e, currentVersion) => {
    const targetVersion = isNaN(e.target.value) ? e.target.value : `v${e.target.value}`;
    let path = location.pathname.replace(currentVersion, targetVersion);
    navigate(path);
};

const SwitchVersion = ({ currentVersion }) => {
    return (
        <select onChange={(e) => doChange(e, currentVersion)} value={currentVersion}>
            {versions.map(version => {
                version = isNaN(version) ? version : `v${version}`;
                return (
                    <option key={version} value={version}>{version}</option>
                )
            })}
        </select>
    )
};

SwitchVersion.propTypes = {
    currentVersion: PropTypes.string.isRequired,
};

SwitchVersion.defaultProps = {
    currentVersion: 'stable',
};

export default SwitchVersion;
