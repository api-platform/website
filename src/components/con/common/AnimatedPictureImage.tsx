import React from 'react';
import '@styles/components/con/home/index.scss';
import useAnimation, { DirectionType } from '@con/hooks/useAnimation';

interface AnimatedPictureImageProps {
  direction?: DirectionType;
}

const AnimatedPictureImage: React.ComponentType<AnimatedPictureImageProps> = ({ direction = 'scale', children }) => {
  const animation = useAnimation(direction);
  return (
    <div className="conf__picture-image" ref={animation}>
      {children}
    </div>
  );
};

export default AnimatedPictureImage;
