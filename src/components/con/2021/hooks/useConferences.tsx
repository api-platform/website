import { useStaticQuery, graphql } from 'gatsby';
import { Conference } from '../types';

const useConferences: (speaker?: string, withBreaks?: boolean) => Conference[] = (speaker, withBreaks) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "conference" } } }) {
        nodes {
          frontmatter {
            title
            speakers
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
    }
  `);
  const conferences = data.allMarkdownRemark.nodes
    .filter((conferenceData) => !speaker || conferenceData.frontmatter.speakers.includes(speaker))
    .map((conference) => ({
      ...conference.frontmatter,
      title: conference.headings?.[0].value,
      slug: conference.fields.slug,
    }));

  const breaks = withBreaks
    ? [
        {
          title: 'Welcome speech',
          start: '09:00',
          end: '09:10',
          track: 'EN',
        },
        {
          title: 'Morning break',
          start: '10:35',
          end: '11:00',
        },
        {
          title: 'Lunch break',
          start: '12:25',
          end: '14:00',
        },
        {
          title: 'Afternoon break',
          start: '15:50',
          end: '16:15',
          track: 'EN',
        },
      ]
    : [];

  return [...conferences, ...breaks];
};

export default useConferences;
