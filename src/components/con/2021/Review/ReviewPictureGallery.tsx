import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import PictureGallery from '@components/con/common/PictureGallery';

const ReviewPictureGallery: React.ComponentType = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "review2021" }, name: { regex: "/^pic-/" } }
        sort: { fields: name }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 350, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);
  const images: { image: IGatsbyImageData; name: string }[] = data.allFile.nodes.map((item) => ({
    image: getImage(item),
    name: item.name,
  }));
  return (
    <section>
      <PictureGallery link="https://www.flickr.com/photos/194052559@N02/albums/72157719936921021">
        {images.map(({ image, name }, index) => (
          <GatsbyImage key={`${name} ${index}`} image={image} alt={`API Platform con 2021 - ${name}`} />
        ))}
      </PictureGallery>
    </section>
  );
};

export default ReviewPictureGallery;
