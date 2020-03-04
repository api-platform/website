import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Contributors from '../../images/contributors.svg';
import { ContributorType } from '../../types';
import BigContributor from '../../components/community/BigContributor';
import Layout from '../../components/Layout';
import { Grid, GridItem } from '../../components/common/Grid';
import { isCoreTeam } from '../../helpers/contributorHelper';

const ContributorsPage = ({ location, data }) => {
  const contributors = [...data.allContributor.nodes];

  const firstContributor = contributors.shift();
  const topContributors = contributors.splice(0, 9);

  return (
    <Layout location={location}>
      <div className="contributors">
        <Helmet title="Contributors" />
        <header className="contributors__header page__header-overlaid bg-blue-extralight color-blue-extradark">
          <div className="container">
            <div className="contributors__title">
              <img src={Contributors} alt="contributor" />
              <div>
                <h1 className="page__title">
                  Our <strong className="color-blue-dark">contributors</strong>
                </h1>
                <p className="page__subtitle h4-like">{`${data.allContributor.totalCount} people have contributed to API Platform code.`}</p>
              </div>
              <img src={Contributors} alt="contributor" />
            </div>
          </div>
        </header>
        <section className="contributors__top bg-white">
          <div className="container">
            <h2 className="accessibility__hidden-block">Top contributors</h2>
            <Grid className="top__grid">
              <GridItem full padding={10}>
                {firstContributor && <BigContributor contributor={firstContributor} size="big" />}
              </GridItem>
              {topContributors.map(contributor => (
                <GridItem key={contributor.login} padding={10}>
                  <BigContributor contributor={contributor} />
                </GridItem>
              ))}
            </Grid>
          </div>
        </section>
        <section className="contributors__all">
          <div className="container">
            <h2 className="contributors-all__title">All contributors</h2>
            <Grid>
              {contributors.map(contributor => (
                <GridItem key={contributor.login} padding={10}>
                  <Link
                    to={`/community/contributors/${contributor.login}`}
                    className="contributor__card card clickable horizontal small p-10"
                  >
                    <div className="avatar bg-grey-light crop xsmall">
                      <img loading="lazy" src={contributor.avatar} alt={contributor.login} />
                    </div>
                    <div className="card__content">
                      <h3 className="card__title text-big color-blue-extradark">{`#${contributor.position} | ${contributor.login}`}</h3>
                      <p className="contributor__contributions color-blue-dark text-xs">{`${
                        contributor.contributions
                      } ${1 < contributor.contributions ? 'contributions' : 'contribution'}`}</p>
                      <p className="contributor__lines color-grey-dark text-xs">
                        {contributor.lines ? (
                          <span>{`${contributor.lines} lines`}</span>
                        ) : (
                          <span className="no-stat">(no stats)</span>
                        )}
                      </p>
                    </div>
                    {isCoreTeam(contributor) && (
                      <img
                        className="contributor__badge"
                        src="/badges/core-team.svg"
                        alt="core-team"
                        title="Core team member"
                      />
                    )}
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </div>
        </section>
      </div>
    </Layout>
  );
};

ContributorsPage.propTypes = {
  data: PropTypes.shape({
    allContributor: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf(ContributorType),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    allContributor(filter: { login: { ne: "dummy-api-platform" } }) {
      totalCount
      nodes {
        id
        login
        avatar
        profile_url
        contributions
        position
        lines
        teams
      }
    }
  }
`;

export default ContributorsPage;
