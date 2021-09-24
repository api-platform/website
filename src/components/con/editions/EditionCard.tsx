import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Edition } from '../types';

interface EditionCardProps {
  edition: Edition;
  size: 'small' | 'big';
}

const EditionCard: React.ComponentType<EditionCardProps> = ({ edition, size = 'big' }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "editionsImages" } }) {
        nodes {
          name
          small: childImageSharp {
            gatsbyImageData(width: 240, placeholder: DOMINANT_COLOR)
          }
          big: childImageSharp {
            gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);

  const images = data.allFile.nodes.find((imageData) => imageData.name === edition.image);
  const image = images && getImage('big' === size ? images.big : images.small);

  return (
    <Link to={`/con/${edition.year}`} className="card clickable p-5 conf__edition-card">
      <GatsbyImage image={image} alt={edition.image} />
    </Link>
  );
};

export default EditionCard;
