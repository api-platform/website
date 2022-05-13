import { useContext } from 'react';
import { ConfContext } from '@con/components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import { Speaker } from 'src/con/types';

const useSpeaker: (id: string) => Speaker = (id) => {
  const { edition } = useContext(ConfContext);
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "speaker" } } }) {
        nodes {
          fields {
            slug
            collection
          }
          frontmatter {
            name
            id
            job
            company
            twitter
            github
          }
        }
      }
    }
  `);

  const speakers = data.allMarkdownRemark.nodes
    .filter((speakerData) => !id || speakerData.frontmatter.id === id)
    .filter((speakerData) => speakerData.fields.collection === `con${edition}`)
    .map((speaker) => ({
      ...speaker.frontmatter,
      slug: `/con/${edition}${speaker.fields.slug}`,
    }));

  return speakers?.[0];
};

export default useSpeaker;
