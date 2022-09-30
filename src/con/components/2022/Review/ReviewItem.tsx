import React, { PropsWithChildren } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import useAnimation from '@con/hooks/useAnimation';

interface ReviewProps extends PropsWithChildren {
  title: JSX.Element;
  imageId: string;
}

const Review: React.ComponentType<ReviewProps> = ({ title, imageId, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "review2022" } }) {
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

  const animationLeft = useAnimation('left', undefined, undefined, undefined);
  const animationRight = useAnimation('right');
  const animationScale = useAnimation('scale', 1.5, 0.5, undefined, '0px 0px -20% 0px');

  return (
    <div className="conf__review-item">
      <div className="review-item__title" ref={animationScale}>
        {title}
      </div>
      <div className="review-item__aside">
        <div className="review-item__picture" ref={animationLeft}>
          <div className="w-full h-full">
            <GatsbyImage image={image} alt="" />
          </div>
        </div>
        <div className="review-item__content" ref={animationRight}>
          <div className="review-item__card dotted-corner">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
