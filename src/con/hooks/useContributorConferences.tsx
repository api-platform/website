import { useStaticQuery, graphql } from 'gatsby';
import { Conference } from 'src/con/types';

const useContributorConferences: (login?: string) => Conference[] = (login) => {
  const data = useStaticQuery(graphql`
    query {
      conferences: allMarkdownRemark(limit: 100, filter: { frontmatter: { type: { eq: "conference" } } }) {
        nodes {
          frontmatter {
            title
            speakers
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
            collection
          }
        }
      }
      speakers: allMarkdownRemark(limit: 100, filter: { frontmatter: { type: { eq: "speaker" } } }) {
        nodes {
          frontmatter {
            id
            github
          }
          fields {
            collection
          }
        }
      }
    }
  `);

  const isSpeakerContributor = (id: string, edition: string) => {
    return (
      data.speakers.nodes.find(
        (speakerData) => speakerData.frontmatter.id === id && speakerData.fields.collection === edition
      )?.frontmatter.github === login
    );
  };

  const conferences = data.conferences.nodes
    .filter((conferenceData) =>
      conferenceData.frontmatter.speakers
        .substr(1)
        .replace(' -', ' ')
        .split(' ')
        .some((id) => isSpeakerContributor(id, conferenceData.fields.collection))
    )
    .map((conference) => ({
      ...conference.frontmatter,
      edition: conference.fields.collection.replace('con', ''),
      title: conference.headings?.[0].value,
      slug: `/con/${conference.fields.collection.replace('con', '')}${conference.fields.slug}`,
    }));

  return conferences;
};

export default useContributorConferences;
