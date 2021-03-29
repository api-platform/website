import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Speaker } from '../types';

const Avatar: React.ComponentType<{ speakers: Speaker[] }> = ({ speakers }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakersImages" } }) {
        nodes {
          name
          childImageSharp {
            base: resize(width: 90, height: 90, quality: 100) {
              src
            }
            retina: resize(width: 180, height: 180, quality: 100) {
              src
            }
          }
        }
      }
    }
  `);

  const getImages = (image) => data.allFile.nodes.filter((imageData) => imageData.name === image)?.[0]?.childImageSharp;
  const getSize = (total) => {
    if (1 === total) return 90;
    if (2 === total) return 70;
    return 50;
  };
  return (
    <div className="schedule__slot-avatar">
      {speakers.map((speaker, index) => {
        const images = getImages(speaker.id);

        return (
          <Link
            to={speaker.slug}
            key={speaker.name}
            className="avatar__circle"
            style={{
              width: `${getSize(speakers.length)}px`,
              height: `${getSize(speakers.length)}px`,
              left: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
              top: `${(100 / (speakers.length + 1)) * (index + 1)}%`,
            }}
          >
            <img
              width="90"
              height="90"
              src={images?.base.src}
              alt={speaker.name}
              srcSet={`${images?.base.src} 1x, ${images?.retina.src} 2x`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Avatar;
