import { useStaticQuery, graphql } from 'gatsby';
import { Conference } from '../types';

const useConferences: (speaker?: string) => Conference[] = (speaker) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "conference" } } }) {
        nodes {
          frontmatter {
            title
            speaker
            track
            start
            end
            short
          }
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.nodes
    .filter((conferenceData) => !speaker || conferenceData.frontmatter.speaker === speaker)
    .map((conference) => ({
      ...conference.frontmatter,
      title: conference.headings?.[0].value,
      slug: conference.fields.slug,
    }));
};

export default useConferences;
