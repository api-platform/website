import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import DocNav from '../components/layout/DocNav';

// eslint-disable-next-line no-undef
export const query = graphql`
  query Tree {
    docsYaml(id: { regex: "/docs/nav.yml/" }) {
      chapters {
        title
        path
        items {
          title
          id
          anchors {
            id
            title
          }
        }
      }
    }
  }
`;

const RenderInnerList = ({ anchors, path }) => (
  <ol>
    {anchors.map(({ id, title }) => {
      const currentPath = `${path}#${id}`;

      return (
        <li key={currentPath}>
          <Link to={currentPath}>{title}</Link>
        </li>
      );
    })}
  </ol>
);
RenderInnerList.propTypes = {
  anchors: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

const RenderList = ({ items, path }) => (
  <ol>
    {items.map(({ id, title, anchors }) => {
      let currentPath = path;
      if ('index' !== id) {
        currentPath += `/${id}`;
      }

      return (
        <li key={currentPath}>
          <Link to={currentPath}>{title}</Link>
          {anchors && <RenderInnerList anchors={anchors} path={currentPath} />}
        </li>
      );
    })}
  </ol>
);
RenderList.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

const Render = ({ data: { docsYaml: { chapters } } }) => (
  <div className="page__docs">
    <Helmet title="API Platform Documentation" />
    <div className="container docs__content">
      <h1>API Platform Documentation</h1>
      {chapters.map(({ path, title, items }) => {
        const currentPath = `/docs/${path}`;

        return (
          <section key={path}>
            <h2>
              <Link to={currentPath}>{title}</Link>
            </h2>
            <RenderList items={items} path={currentPath} />
          </section>
        );
      })}
    </div>
    <DocNav nav={chapters} />
  </div>
);
Render.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Render;
