import React, { PropsWithChildren } from 'react';
import AnimatedPictureImage from '@con/components/common/AnimatedPictureImage';
import Button from '@con/components/common/Button';

interface PictureGalleryProps extends PropsWithChildren {
  link?: string;
  className?: string;
}

const PictureGallery: React.ComponentType<PictureGalleryProps> = ({ link, children, className = '' }) => {
  return (
    <section className={`conf__gallery ${className}`}>
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
