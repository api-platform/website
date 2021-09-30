import React from 'react';
import ReviewCover from './ReviewCover';
import ReviewList from './ReviewList';
import ReviewPictureGallery from './ReviewPictureGallery';

const Review: React.ComponentType = () => {
  return (
    <>
      <ReviewCover />
      <ReviewList />
      <ReviewPictureGallery />
    </>
  );
};

export default Review;
