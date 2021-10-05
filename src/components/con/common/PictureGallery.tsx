import React from 'react';
import '@styles/components/con/home/index.scss';
import AnimatedPictureImage from '@con/common/AnimatedPictureImage';
import Button from '@con/common/Button';

interface PictureGalleryProps {
  link?: string;
}

const PictureGallery: React.ComponentType<PictureGalleryProps> = ({ link, children }) => {
  return (
    <section className="conf__gallery">
      <div className="container">
        <div className="conf__picture-grid">
          {React.Children.map(children, (child) => (
            <AnimatedPictureImage>{child}</AnimatedPictureImage>
          ))}
        </div>
        {link ? (
          <Button className="mx-auto mt-20" empty external to={link}>
            See more pics on Flickr
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default PictureGallery;
