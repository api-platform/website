import React, { useCallback } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Button from '@con/common/Button';
import useDynamicRefs from '@components/con/hooks/useDynamicRefs';

const Review: React.ComponentType = () => {
  const [getRef] = useDynamicRefs();

  const scrollToList = useCallback(() => {
    const reviewList = getRef('review-list');

    if (reviewList) reviewList.current.scrollIntoView({ behavior: 'smooth' });
  }, [getRef]);

  return (
    <section>
      <div className="conf__review-bg">
        <StaticImage
          src="../../images/editions/2021.jpg"
          alt="Api platform con 2021 picture"
          className="review__bg-image"
        />
      </div>
      <div className="container conf__review-cover">
        <h1 className="review__cover-title">
          <span>2021 review</span>
          <span className="uppercase">It was a blast!</span>
        </h1>
        <p className="review__cover-text">
          Thank you again for joining and trusting us on this first edition!
          <br />
          We are looking forward to seeing you all again next year.
        </p>
        <div className="review__cover-buttons">
          <Button onClick={scrollToList}>Discover our review</Button>
        </div>
      </div>
    </section>
  );
};

export default Review;
