import { useContext } from 'react';
import { ConfContext } from '@con/components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import { Conference } from 'src/con/types';

const useConferences: (speaker?: string) => Conference[] = (speaker) => {
  const { edition } = useContext(ConfContext);
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
            collection
          }
        }
      }
    }
  `);

  const conferences = data.allMarkdownRemark.nodes
    .filter((conferenceData) => !speaker || conferenceData.frontmatter.speakers.includes(speaker))
    .filter((conferenceData) => conferenceData.fields.collection === `con${edition}`)
    .map((conference) => ({
      ...conference.frontmatter,
      title: conference.headings?.[0].value,
      slug: `/con/${edition}${conference.fields.slug}`,
    }));

  return conferences;
};

export default useConferences;
