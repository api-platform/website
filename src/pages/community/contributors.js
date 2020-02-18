import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { ContributorType } from "../../types";
import BigContributor from "../../components/community/BigContributor";
import Layout from "../../components/Layout";

const ContributorsPage = ({ location, data }) => {
  const contributors = [...data.allContributor.nodes];

  const firstContributor = contributors.shift();
  const topContributors = contributors.splice(0, 9);

  return (
    <Layout location={location}>
      <div className="contributors">
        <Helmet title="Contributors" />
        <header className="contributors__header">
          <div className="container">
            <h1>
              Our <strong>contributors</strong>
            </h1>
            <p className="h4-like">We love them!</p>
          </div>
        </header>
        <section className="contributors__top">
          <div className="container">
            <h2 className="contributors-top__title">Top ten</h2>
            <div className="grid__container">
              <div className="grid__item full p-10">
                <BigContributor contributor={firstContributor} size="big" />
              </div>
              {topContributors.map(contributor => (
                <div className="grid__item p-10">
                  <BigContributor contributor={contributor} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="contributors__all">
          <div className="container">
            <h2 className="contributors-all__title">All contributors</h2>
            <div className="grid__container">
              {contributors.map(contributor => (
                <div className="grid__item p-10">
                  <Link
                    to={`/community/contributors/${contributor.login}`}
                    className="contributor__card card horizontal small p-10"
                  >
                    <div className="avatar grey crop xsmall">
                      <img
                        loading="lazy"
                        src={contributor.avatar}
                        alt={contributor.login}
                      />
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">{`${contributor.position}. ${contributor.login}`}</h3>
                      <p className="contributor__contributions">{`${
                        contributor.contributions
                      } ${
                        1 < contributor.contributions
                          ? "contributions"
                          : "contribution"
                      }`}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

ContributorsPage.propTypes = {
  data: PropTypes.shape({
    allContributor: PropTypes.shape({
      nodes: PropTypes.arrayOf({
        ContributorType
      })
    })
  }).isRequired,
  location: PropTypes.object.isRequired
};

export const query = graphql`
  query {
    allContributor {
      nodes {
        id
        login
        avatar
        profile_url
        contributions
        position
      }
    }
  }
`;

export default ContributorsPage;
