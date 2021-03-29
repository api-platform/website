import { useStaticQuery, graphql } from 'gatsby';
import { Speaker } from '../types';

const useSpeaker: (id: string) => Speaker = (id) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "speaker" } } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            name
            id
            job
            twitter
            github
          }
        }
      }
    }
  `);

  const speakers = data.allMarkdownRemark.nodes
    .filter((speakerData) => !id || speakerData.frontmatter.id === id)
    .map((speaker) => ({
      ...speaker.frontmatter,
      slug: speaker.fields.slug,
    }));

  return speakers?.[0];
};

export default useSpeaker;
