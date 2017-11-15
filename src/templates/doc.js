import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import DocNav from 'components/layout/DocNav';

const Template = ({ data, pathContext }) => (
  <div className="page__docs">
    <Helmet title={(pathContext.current && pathContext.current.title) || 'Documentation'} />
    <div className="container docs__content">
      <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
    </div>
    <div className="container docs__nav">
      {pathContext.prev && (
        <Link className="prev" to={pathContext.prev.path}>
          <i className="icon-chevron-left" />
          <span>{pathContext.prev.title}</span>
        </Link>
      )}
      {pathContext.next && (
        <Link className="next" to={pathContext.next.path}>
          <span>{pathContext.next.title}</span>
          <i className="icon-chevron-right" />
        </Link>
      )}
    </div>
    <DocNav nav={data.navDoc.edges} />
  </div>
);

export default Template;

Template.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
};

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query DocByPath($path: String!) {
    post: markdownRemark(fields: { path: { eq: $path } }) {
      html
    }
    navDoc: allNavYaml {
      edges {
        node {
          title
          path
          items {
            id
            title
            anchors {
              id
              title
            }
          }
        }
      }
    }
  }
`;
