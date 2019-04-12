module.exports.getPrefixedVersion = version => (Number.isNaN(Number(version)) ? version : `v${version}`);
