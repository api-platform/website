import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PictureGallery from '@con/components/common/PictureGallery';
import Section from '@con/components/common/Section';
import SectionTitle from '@con/components/common/SectionTitle';

const LastEdition: React.ComponentType = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        limit: 6
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
    <Section className="pt-20 pb-200 overflow-hidden relative" section="lastyear">
      <div className="container">
        <SectionTitle dark>
          What happened <strong>last year</strong>?
        </SectionTitle>
        <p className="conf__section-subtitle dark mb-0">
          Take a look at the 2022 edition and find more information on <Link to="/con/2022/review">our review</Link>
        </p>
      </div>
      <PictureGallery className="pt-40" link="https://flickr.com/photos/194052559@N02/albums/72177720302238684">
        {images.map(({ image, name }, index) => (
          <GatsbyImage key={`${name} ${index}`} image={image} alt={`API Platform con 2022 - ${name}`} />
        ))}
      </PictureGallery>
    </Section>
  );
};

export default LastEdition;
