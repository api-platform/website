import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import DocNav from '../components/layout/DocNav';
import SwitchVersion from '../components/docs/SwitchVersion';

const Template = ({ location, pageContext }) => (
<Layout location={location}>
  <div className="page__docs">
    <Helmet title={(pageContext.title && pageContext.title) || 'Documentation'} />
    <div className="container docs__content">
      <SwitchVersion location={location} currentVersion={pageContext.version} />
      <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
      <div>
        <p>
          <a
            href={`https://github.com/api-platform/docs/edit/${process.env.GATSBY_BRANCH_NAME || 'master'}/${
              pageContext.editPath
            }`}
          >
            You can also help us improve the documentation of this page.
          </a>
        </p>
      </div>
    </div>
    <div className="container docs__nav">
      {pageContext.previous.slug && (
        <Link className="prev" to={`/${pageContext.previous.slug}`}>
          <i className="icon-chevron-left" />
          <span>{pageContext.previous.title}</span>
        </Link>
      )}
      {pageContext.next.slug && (
        <Link className="next" to={`/${pageContext.next.slug}`}>
          <span>{pageContext.next.title}</span>
          <i className="icon-chevron-right" />
        </Link>
      )}
    </div>
    <DocNav version={pageContext.version} nav={pageContext.nav.chapters} location={location} />
  </div>
</Layout>
);

export default Template;

Template.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};
