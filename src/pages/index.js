import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Cover from '../components/home/Cover';
import Ecosystem from '../components/home/Ecosystem';
import AllInOne from '../components/home/AllInOne';
import Giants from '../components/home/Giants';
import Expose from '../components/home/Expose';
import Schema from '../components/home/Schema';
import References from '../components/home/References';
import Seo from '../components/home/Seo';
import '../styles/main.scss';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <div className="home">
      <Helmet title="REST and GraphQL framework on top of Symfony and React" />
      <Cover />
      <Ecosystem />
      <AllInOne />
      <Giants />
      <Schema />
      <Expose />
      <Seo />
      <References />
    </div>
  </Layout>
);
IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
