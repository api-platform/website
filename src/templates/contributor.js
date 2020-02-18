import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";

const Template = ({ location, pageContext: contributor }) => {
  return (
    <Layout location={location}>
      <h1>{contributor.name}</h1>
    </Layout>
  );
};

export default Template;

Template.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};
