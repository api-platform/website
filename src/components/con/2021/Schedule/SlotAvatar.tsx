import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Speaker } from '../types';

const Avatar: React.ComponentType<{ speakers: Speaker[] }> = ({ speakers }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakersImages" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);

  const getSpeakerImage = (name) => getImage(data.allFile.nodes.find((imageData) => imageData.name === name));
  const getSize = (total) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  return (
    <div className="schedule__slot-avatar">
      {speakers.map((speaker, index) => {
        const image = getSpeakerImage(speaker.id);

        return (
          <div
            key={speaker.name}
            className="avatar__circle"
            style={{
              width: `${getSize(speakers.length)}px`,
              height: `${getSize(speakers.length)}px`,
              left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
              top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            }}
          >
            <GatsbyImage image={image} className="circle__picture" alt={speaker.name} />
          </div>
        );
      })}
    </div>
  );
};

export default Avatar;
