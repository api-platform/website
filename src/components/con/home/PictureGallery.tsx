import React from 'react';
import '@styles/components/con/home/index.scss';
import { StaticImage } from 'gatsby-plugin-image';
import AnimatedPictureImage from './AnimatedPictureImage';

const PictureGallery: React.ComponentType = () => {
  return (
    <section className="conf__landing-gallery">
      <div className="container">
        <div className="conf__picture-grid">
          <AnimatedPictureImage>
            <StaticImage src="./picture1.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
          <AnimatedPictureImage>
            <StaticImage src="./picture2.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
          <AnimatedPictureImage>
            <StaticImage src="./picture3.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
          <AnimatedPictureImage>
            <StaticImage src="./picture4.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
          <AnimatedPictureImage>
            <StaticImage src="./picture5.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
          <AnimatedPictureImage>
            <StaticImage src="./picture6.jpeg" alt="Api platform con 2021 picture" height={400} />
          </AnimatedPictureImage>
        </div>
      </div>
    </section>
  );
};

export default PictureGallery;
