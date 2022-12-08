import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import PictureGallery from '@con/components/common/PictureGallery';
import Section from '@con/components/common/Section';
import SectionTitle from '@con/components/common/SectionTitle';

const LastEdition: React.ComponentType = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        limit: 6
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
    <Section className="conf__bg-white pt-20 pb-50 overflow-hidden relative" section="lastyear">
      <div className="container">
        <SectionTitle>
          What happened <strong>last year</strong>?
        </SectionTitle>
        <p className="conf__section-subtitle mb-0">
          Thank you again for joining and trusting us on this first edition!
        </p>
      </div>
      <PictureGallery className="pt-40" link="https://www.flickr.com/photos/194052559@N02/albums/72157719936921021">
        {images.map(({ image, name }, index) => (
          <GatsbyImage key={`${name} ${index}`} image={image} alt={`API Platform con 2021 - ${name}`} />
        ))}
      </PictureGallery>
    </Section>
  );
};

export default LastEdition;
