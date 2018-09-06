import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import DocNav from 'components/layout/DocNav';

const Template = ({ pathContext }) => (
  <div className="page__docs">
    <Helmet title={(pathContext.current && pathContext.current.title) || 'Documentation'} />
    <div className="container docs__content">
      <div dangerouslySetInnerHTML={{ __html: pathContext.html }} />
      <div>
        <p><a href={`https://github.com/api-platform/docs/edit/${process.env.GATSBY_BRANCH_NAME || 'master'}/${pathContext.editPath}`}>You can also help us improving the documentation of this page.</a></p>
      </div>
    </div>
    <div className="container docs__nav">
      {pathContext.prev && (
        <Link className="prev" to={`/${pathContext.prev.path}`}>
          <i className="icon-chevron-left" />
          <span>{pathContext.prev.title}</span>
        </Link>
      )}
      {pathContext.next && (
        <Link className="next" to={`/${pathContext.next.path}`}>
          <span>{pathContext.next.title}</span>
          <i className="icon-chevron-right" />
        </Link>
      )}
    </div>
    <DocNav nav={pathContext.nav} />
  </div>
);

export default Template;

Template.propTypes = {
  pathContext: PropTypes.object.isRequired,
};
