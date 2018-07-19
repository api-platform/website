import React from 'react';
import DocNav from 'components/layout/DocNav';
import PropTypes from 'prop-types';

export default function RenderIndex({ data }) {
  const nav = data.allDocsYaml.edges.filter(edges => edges.node && edges.node.chapters);
  return (
    <div className="home">
      <DocNav nav={nav[0].node.chapters} />
    </div>
  );
};

export const query = graphql`
  query nav {
  allDocsYaml {
      edges {
        node {
          chapters {
            title
            path
            items {
              id
              title
              anchors {
                id
                title
                anchors {
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
      }
    }
  }
`;

RenderIndex.propTypes = {
  data: PropTypes.object.isRequired,
};
