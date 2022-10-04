import React, { useCallback } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Button from '@con/components/common/Button';
import useDynamicRefs from '@con/hooks/useDynamicRefs';

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
          src="../../../images/editions/2022.jpg"
          alt="Api platform con 2022 picture"
          className="review__bg-image"
        />
      </div>
      <div className="container conf__review-cover">
        <h1 className="review__cover-title">
          <span>2022 review</span>
          <span className="uppercase">An edition beyond our expectations</span>
        </h1>
        <p className="review__cover-text">
          Thank you to all our attendees for joining us for this second edition.
          <br />
          We hope you enjoyed it as much as we loved organizing it.
        </p>
        <p>
          API Platform Con will be back in 2023. To stay up to date on all of our latest news, follow us on{' '}
          <a href="https://twitter.com/ApiPlatform" target="_blank" rel="noreferrer noopener">
            Twitter
          </a>
          .
        </p>
        <div className="review__cover-buttons">
          <Button onClick={scrollToList}>Discover our review</Button>
        </div>
      </div>
    </section>
  );
};

export default Review;
