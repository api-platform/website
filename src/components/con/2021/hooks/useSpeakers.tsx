import { useStaticQuery, graphql } from 'gatsby';
import { Speaker } from '../types';

const useSpeakers: (ids?: string[]) => Speaker[] = (ids) => {
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
    .filter((speakerData) => !ids || ids.includes(speakerData.frontmatter.id))
    .map((speaker) => ({
      ...speaker.frontmatter,
      slug: speaker.fields.slug,
    }));

  return speakers;
};

export default useSpeakers;
