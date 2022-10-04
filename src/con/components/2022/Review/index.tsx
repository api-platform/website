import React from 'react';
import { Helmet } from 'react-helmet';
import ReviewCover from './ReviewCover';
import ReviewList from './ReviewList';
import ReviewPictureGallery from './ReviewPictureGallery';

const Review: React.ComponentType = () => {
  return (
    <>
      <Helmet>
        <title>2022 review</title>
        <meta property="og:title" content="2022 review" />
        <meta name="twitter:title" content="2022 review" />
      </Helmet>
      <ReviewCover />
      <ReviewList />
      <ReviewPictureGallery />
    </>
  );
};

export default Review;
