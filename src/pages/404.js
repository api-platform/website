import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Spider from '../images/404.svg';

const NotFoundPage = props => (
  <Layout location={props.location}>
    <div className="notfound">
      <Helmet title="404" />
      <div className="container notfound__content">
        <div className="notfound__text">
          <h1>Oops!</h1>
          <p>Looks like this page doesn&#39;t exist...</p>
        </div>
        <img src={Spider} alt="spider" width="371" height="344" />
      </div>
    </div>
  </Layout>
);
NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;
