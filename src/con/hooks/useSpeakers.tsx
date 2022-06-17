import { useContext } from 'react';
import { ConfContext } from '@con/components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import { Speaker } from 'src/con/types';

const useSpeakers: (ids?: string[]) => Speaker[] = (ids) => {
  const { edition } = useContext(ConfContext);
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { type: { eq: "speaker" } } }
        sort: { fields: frontmatter___id, order: ASC }
      ) {
        nodes {
          fields {
            slug
            collection
          }
          frontmatter {
            name
            id
            number
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
    .filter((speakerData) => !ids || ids.includes(speakerData.frontmatter.id))
    .filter((speakerData) => speakerData.fields.collection === `con${edition}`)
    .map((speaker) => ({
      ...speaker.frontmatter,
      slug: `/con/${edition}${speaker.fields.slug}`,
    }));

  return speakers;
};

export default useSpeakers;
