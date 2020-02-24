import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { Grid, GridItem } from '../components/common/Grid';

const externalLinkAttributes = 'target="_blank" rel="nofollow noopener noreferrer"';

const parseGithubText = text => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

  const linkifyText = text.replace(urlRegex, url => `<a href="${url}" ${externalLinkAttributes}">${url}</a>`);
  const githubRegex = /(?<=^|\s)@([a-zA-Z-]+)/gi;

  return linkifyText.replace(
    githubRegex,
    githubResource =>
      `<a href="https://github.com/${githubResource.substring(1)}" ${externalLinkAttributes}">${githubResource}</a>`
  );
};

const GithubInfo = ({ value, icon, link }) => {
  const githubLink = '@' === value.charAt(0) ? `https://github.com/${value.substring(1)}` : null;

  if (link || githubLink)
    return (
      <a rel="nofollow noopener noreferrer" target="_blank" href={link || githubLink} className="contributor__info">
        <span className={`icon-${icon}`} />
        {value}
      </a>
    );
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

  const contributorName = contributor.name || contributor.login;

  const getContributionsText = () => {
    if (10 >= contributor.position)
      return `${contributorName} is one of the most active contributors to the API Platform framework, and worked on`;
    else if (20 < contributor.contributions)
      return `${contributorName} enhanced the API Platform framework with no less than ${contributor.contributions} contributions. This active contributor worked on`;
    return `${contributorName} is a contributor to the API Platform framework and worked on`;
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
      <div className="contributor">
        <Helmet title={`${contributor.name}, API Platform contributor`} />
        <header className="contributor__header">
          <div className="container">
            <div className="header__content">
              <h1 className="header__title">{`Contributor #${contributor.position}`}</h1>
            </div>
          </div>
        </header>
        <section>
          <div className="container contributor__main">
            <div className="contributor__card">
              <div className="card__top">
                <div className="avatar crop">
                  <img src={contributor.avatar} alt={contributor.login} />
                </div>
                <div className="card__content">
                  <h2 className="h1-like contributor__title">
                    {contributor.name || contributor.login}
                  </h2>
                  <p className="contributor__subtitle">{`(${contributor.login})`}</p>
                  {contributor.bio && (
                    <p
                      className="contributor__bio"
                      dangerouslySetInnerHTML={{
                        __html: parseGithubText(contributor.bio)
                      }}
                    />
                  )}
                  <div className="contributor__infos">
                    {contributor.location && (
                      <GithubInfo
                        icon="location"
                        value={contributor.location}
                      />
                    )}
                    {contributor.company && (
                      <GithubInfo icon="office" value={contributor.company} />
                    )}
                    {contributor.blog && (
                      <GithubInfo
                        icon="sphere"
                        link={contributor.blog}
                        value="website"
                      />
                    )}
                    <GithubInfo icon="github" value={`@${contributor.login}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className="contributor__content">
              <div className="contributor__description">
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${getContributionsText()} ${repositoryText}: ${getProjectsText()}.`
                  }}
                />
              </div>
              <Grid className="contributor__projects">
                {contributor.projects.map(project => (
                  <GridItem padding={5}>
                    <a
                      href={`https://github.com/${project.fullName}/commits?author=${contributor.login}`}
                      className="contributor__project card p-10"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                    >
                      <p className="project__name">
                        <span className="icon-github" />
                        {project.name}
                      </p>
                      <p className="project__contributions">{`${
                        project.contributions
                      } ${
                        1 < project.contributions
                          ? "contributions"
                          : "contribution"
                      }`}</p>
                      <p className="project__lines">
                        {project.additions || project.deletions ? <>
                        <span>{`${project.additions}++`}</span>
                        <span>{`${project.deletions}--`}</span>
                        </> : <span className="no-stat">(no stat)</span>}
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
