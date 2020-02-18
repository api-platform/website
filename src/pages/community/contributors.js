import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { ContributorType } from "../../types";
import Contributor from "../../components/community/Contributor";
import Layout from "../../components/Layout";

const ContributorPage = ({ location, data }) => {
  const contributors = [...data.allContributor.nodes];

  const firstContributor = contributors.shift();
  const topContributors = contributors.splice(0, 9);

  return (
    <Layout location={location}>
      <div className="community">
        <Helmet title="Community" />
        <header className="contributors__header">
          <div className="container">
            <h1>
              Our <strong>contributors</strong>
            </h1>
            <h2 className="h4-like">We love them!</h2>
          </div>
        </header>
        <section className="contributors__main">
          <div className="container">
            <Contributor contributor={firstContributor} size="big" />
            <div className="contributors__list">
              {topContributors.map(contributor => (
                <Contributor contributor={contributor} />
              ))}
            </div>
            <div className="contributors__list">
              {contributors.map(contributor => (
                <Contributor contributor={contributor} size="small" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

ContributorPage.propTypes = {
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

export default ContributorPage;
