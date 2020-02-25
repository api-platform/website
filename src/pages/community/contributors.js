import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { ContributorType } from '../../types';
import BigContributor from '../../components/community/BigContributor';
import Layout from '../../components/Layout';
import { Grid, GridItem } from '../../components/common/Grid';

const ContributorsPage = ({ location, data }) => {
  const contributors = [...data.allContributor.nodes];

  const firstContributor = contributors.shift();
  const topContributors = contributors.splice(0, 9);

  return (
    <Layout location={location}>
      <div className="contributors">
        <Helmet title="Contributors" />
        <header className="contributors__header bg-blue-dark color-white">
          <div className="container">
            <h1 className="page__title">
              Our <strong>contributors</strong>
            </h1>
            <p className="page__subtitle h4-like">{`${data.allContributor.totalCount} people have contributed to API Platform code.`}</p>
          </div>
        </header>
        <section className="contributors__top bg-white">
          <div className="container">
            <h2 className="contributors-top__title">Top ten</h2>
            <Grid className="top__grid">
              <GridItem full padding={10}>
                <BigContributor contributor={firstContributor} size="big" />
              </GridItem>
              {topContributors.map(contributor => (
                <GridItem padding={10}>
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
                <GridItem padding={10}>
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
                          <span className="no-stat">(no stat)</span>
                        )}
                      </p>
                    </div>
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
      nodes: PropTypes.arrayOf({
        ContributorType,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    allContributor {
      totalCount
      nodes {
        id
        login
        avatar
        profile_url
        contributions
        position
        lines
      }
    }
  }
`;

export default ContributorsPage;
