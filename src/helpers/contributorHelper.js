export const isCoreTeam = (contributor) =>
  contributor.teams &&
  (contributor.teams.includes('core-team') ||
    contributor.teams.includes('core-team-js') ||
    contributor.teams.includes('core-team-website'));

export const getName = (contributor) => contributor.name || contributor.login;
