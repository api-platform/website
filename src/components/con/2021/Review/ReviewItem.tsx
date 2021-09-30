import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';

interface ReviewProps {
  title: JSX.Element;
  imageId: string;
}

const Review: React.ComponentType<ReviewProps> = ({ title, imageId, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "review2021" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 350, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);
  const images = data.allFile.nodes.find((imageData) => imageData.name === imageId);
  const image = images && getImage(images);
  return (
    <div className="conf__review-item">
      <div className="review-item__title">{title}</div>
      <div className="review-item__aside">
        <div className="review-item__picture">
          <GatsbyImage image={image} alt="" />
        </div>
        <div className="review-item__card dotted-corner">{children}</div>
      </div>
    </div>
  );
};

export default Review;
