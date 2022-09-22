import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { PreviousEdition } from '@con/types';

interface EditionCardProps {
  edition: PreviousEdition;
  size: 'small' | 'big';
  link?: string;
  withEditionTitle?: boolean;
}

const EditionCard: React.ComponentType<EditionCardProps> = ({ edition, withEditionTitle, size = 'big', link }) => {
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
    <a href={link || `/con/${edition.year}`} className="card clickable p-5 m-10 conf__edition-card relative">
      <GatsbyImage image={image} alt={edition.image} />
      {withEditionTitle && <span className="edition-card__title">{edition.year}</span>}
    </a>
  );
};

export default EditionCard;
