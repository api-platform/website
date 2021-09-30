import React from 'react';
import '@styles/components/con/home/index.scss';
import AnimatedPictureImage from '@con/common/AnimatedPictureImage';

const PictureGallery: React.ComponentType = ({ children }) => {
  return (
    <section className="conf__landing-gallery">
      <div className="container">
        <div className="conf__picture-grid">
          {React.Children.map(children, (child) => (
            <AnimatedPictureImage>{child}</AnimatedPictureImage>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PictureGallery;
