import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Contributors from '../components/contributors/Contributors';
import '../styles/main.scss';

const IndexPage = props => (
  <Layout location={props.location}>
    <div className="home">
      <Helmet title="REST and GraphQL framework on top of Symfony and React" />
      <Contributors />
    </div>
  </Layout>
);
IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
