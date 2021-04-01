import { useStaticQuery, graphql } from 'gatsby';
import { Conference } from '../types';

const useContributorConferences: (login?: string) => Conference[] = (login) => {
  const data = useStaticQuery(graphql`
    query {
      conferences: allMarkdownRemark(limit: 100, filter: { frontmatter: { type: { eq: "conference" } } }) {
        nodes {
          frontmatter {
            title
            speaker
            track
            start
            end
            short
            github
          }
          headings(depth: h1) {
            value
          }
          fields {
            slug
          }
        }
      }
      speakers: allMarkdownRemark(limit: 100, filter: { frontmatter: { type: { eq: "speaker" } } }) {
        nodes {
          frontmatter {
            id
            github
          }
        }
      }
    }
  `);

  const speaker = data.speakers.nodes.find((speakerData) => speakerData.frontmatter.github === login);

  const conferences = speaker
    ? data.conferences.nodes
        .filter((conferenceData) => conferenceData.frontmatter.speaker === speaker.frontmatter.id)
        .map((conference) => ({
          ...conference.frontmatter,
          title: conference.headings?.[0].value,
          slug: conference.fields.slug,
        }))
    : [];

  return conferences;
};

export default useContributorConferences;
