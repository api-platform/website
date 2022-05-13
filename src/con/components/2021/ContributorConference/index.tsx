import React from 'react';
import Web from '@con/components/common/Web';
import { Conference } from 'src/con/types';
import { useStaticQuery, graphql } from 'gatsby';
import Logo from '@con/images/logo.svg';

const ContributorConference: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
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
            job
            company
            twitter
            github
          }
        }
      }
    }
  `);

  const ids = conference.speakers;
  const speakers = data.allMarkdownRemark.nodes
    .filter((speakerData) => !ids || ids.includes(speakerData.frontmatter.id))
    .map((speaker) => ({
      ...speaker.frontmatter,
      slug: `/con/${conference.edition}${speaker.fields.slug}`,
    }));

  const speakersName = speakers.map((speaker) => speaker.name).join(' & ');

  return (
    <a href={conference.slug} className="contributor__conference card clickable">
      <Web className="web" />
      <div className="conference__content">
        <img src={Logo} alt="Api Platform Conference" width="200" height="80" />
        <span className="conference__title lined">{conference.title}</span>
        <p className="conference__speaker h6">{speakersName}</p>
      </div>
    </a>
  );
};

export default ContributorConference;
