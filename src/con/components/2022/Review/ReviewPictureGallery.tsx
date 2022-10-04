import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import PictureGallery from '@con/components/common/PictureGallery';

const ReviewPictureGallery: React.ComponentType = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "review2022" }, name: { regex: "/^pic-/" } }
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
      <PictureGallery className="pt-50 pb-200" link="https://flickr.com/photos/194052559@N02/albums/72177720302238684">
        {images.map(({ image, name }, index) => (
          <GatsbyImage key={`${name} ${index}`} image={image} alt={`API Platform con 2022 - ${name}`} />
        ))}
      </PictureGallery>
    </section>
  );
};

export default ReviewPictureGallery;
