import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { Grid, GridItem } from '../components/common/Grid';
import { isCoreTeam, getName } from '../helpers/contributorHelper';

const externalLinkAttributes = 'target="_blank" rel="nofollow noopener noreferrer"';

const parseGithubText = text => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

  const linkifyText = text.replace(urlRegex, url => `<a href="${url}" ${externalLinkAttributes}">${url}</a>`);
  const githubRegex = /(^|\s)@([a-zA-Z-]+)/gi;

  return linkifyText.replace(
    githubRegex,
    githubResource =>
      `<a href="https://github.com/${githubResource
        .trim()
        .replace('@', '')}" ${externalLinkAttributes}">${githubResource}</a>`
  );
};

const GithubInfo = ({ value, icon, link }) => {
  const githubLink = '@' === value.charAt(0) ? `https://github.com/${value.substring(1)}` : null;

  if (link || githubLink) {
    return (
      <a rel="nofollow noopener noreferrer" target="_blank" href={link || githubLink} className="contributor__info">
        <span className={`icon-${icon}`} />
        {'@' === value.charAt(0) ? value.substring(1) : value}
      </a>
    );
  }

  return (
    <p className="contributor__info">
      <span className={`icon-${icon}`} />
      {value}
    </p>
  );
};

GithubInfo.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
};

GithubInfo.defaultProps = {
  link: null,
};

const Template = ({ location, pageContext: contributor }) => {
  const repositoryCount = contributor.projects.length;

  const repositoryText = 1 < repositoryCount ? `${repositoryCount} repositories` : `${repositoryCount} repository`;

  const contributorName = getName(contributor);

  const getContributionsText = () => {
    if (10 >= contributor.position) {
      return `${
        isCoreTeam(contributor) ? 'As an API Platform core team member, ' : ''
      }${contributorName} is one of the most active contributors to the API Platform framework and worked on`;
    }
    if (20 < contributor.contributions) {
      return `${
        isCoreTeam(contributor) ? 'As an API Platform core team member, ' : ''
      }${contributorName} enhanced the API Platform framework with no less than ${
        contributor.contributions
      } contributions. This active contributor worked on`;
    }
    return `${contributorName} is a ${
      isCoreTeam(contributor) ? 'core team member and a ' : ''
    }contributor to the API Platform framework and worked on`;
  };

  const getProjectsText = () => {
    if (!repositoryCount) return '';
    const reposName = contributor.projects.map(p => `<a href="${p.link}" ${externalLinkAttributes}>${p.name}</a>`);
    if (1 === reposName.length) return reposName[0];
    const lastRepo = reposName.pop();
    return `${reposName.join(', ')} and ${lastRepo}`;
  };

  return (
    <Layout location={location}>
      <div className="contributor bg-grey-light">
        <Helmet title={`${contributorName}, API Platform contributor`} />
        <header className="contributor__header bg-blue-extralight">
          <div className="container">
            <div className="header__content">
              <p className="h1-like header__title color-blue-dark">{`Contributor #${contributor.position}`}</p>
            </div>
          </div>
        </header>
        <section>
          <div className="container contributor__main">
            <div className="contributor__card">
              <div className="card__top bg-blue-dark color-white">
                <div className="contributor__picture">
                  <div className="avatar crop">
                    <img src={contributor.avatar} alt={contributor.login} />
                  </div>
                  {isCoreTeam(contributor) && (
                    <img
                      className="contributor__badge"
                      src="/badges/core-team.svg"
                      alt="core-team"
                      title="Core team member"
                    />
                  )}
                </div>
                <div className="card__content">
                  <h1 className="h1-like color-white">{contributorName}</h1>
                  <p className="contributor__subtitle color-blue-extralight">{`(${contributor.login})`}</p>
                  {contributor.bio && (
                    <p
                      className="contributor__bio"
                      dangerouslySetInnerHTML={{
                        __html: parseGithubText(contributor.bio),
                      }}
                    />
                  )}
                  <div className="contributor__infos">
                    {contributor.location && <GithubInfo icon="location" value={contributor.location} />}
                    {contributor.company && <GithubInfo icon="office" value={contributor.company} />}
                    {contributor.blog && <GithubInfo icon="sphere" link={contributor.blog} value="website" />}
                    <GithubInfo icon="github" value={`@${contributor.login}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className="contributor__content">
              <div className="contributor__description">
                <p
                  className="text-big"
                  dangerouslySetInnerHTML={{
                    __html: `${getContributionsText()} ${repositoryText}: ${getProjectsText()}.`,
                  }}
                />
              </div>
              <Grid className="contributor__projects">
                {contributor.projects.map(project => (
                  <GridItem padding={5}>
                    <a
                      href={`https://github.com/${project.fullName}/commits?author=${contributor.login}`}
                      className="contributor__project card p-10 clickable"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                    >
                      <p className="project__name color-blue-extradark text-big">
                        <span className="icon-github" />
                        {project.name}
                      </p>
                      <p className="project__contributions color-blue-dark text-xs">{`${project.contributions} ${
                        1 < project.contributions ? 'contributions' : 'contribution'
                      }`}</p>
                      <p className="project__lines color-grey-dark text-xs">
                        {project.additions || project.deletions ? (
                          <>
                            <span>{`${project.additions}++`}</span>
                            <span>{`${project.deletions}--`}</span>
                          </>
                        ) : (
                          <span className="no-stat">(no stats)</span>
                        )}
                      </p>
                    </a>
                  </GridItem>
                ))}
              </Grid>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Template;

Template.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};
