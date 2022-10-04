import React from 'react';
import Button from '@con/components/common/Button';
import useDynamicRefs from '@con/hooks/useDynamicRefs';
import ReviewItem from './ReviewItem';

const ReviewList: React.ComponentType = () => {
  const [, setRef] = useDynamicRefs();
  const reviewRef = setRef('review-list');

  return (
    <section className="conf__review-list" ref={reviewRef}>
      <div className="container">
        <ReviewItem
          imageId="days"
          title={
            <>
              <strong>2</strong>
              <span>awesome days</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">We doubled the fun</div>
          <p>This year, the API Platform Con took place over 2 days with still two tracks in both languages.</p>
          <p>
            Tracks were given in{' '}
            <a href="https://www.euratechnologies.com/" target="_blank" rel="noreferrer noopener">
              Euratechnologies
            </a>
            , located at 1 hour from Paris, 30 min from Brussels and 12 hours from Montreal!
          </p>
        </ReviewItem>
        <ReviewItem
          imageId="speakers"
          title={
            <>
              <strong>29</strong>
              <span>inspiring speakers</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">They made this event so amazing!</div>
          <p>
            Some of the best speakers from our ecosystem came from America, Africa or Europe and shared their knowledge
            in English and in French.
          </p>
          <p>
            A wide variety of topics were discussed and we’re very proud to have welcomed some new speakers who were on
            stage for the very first time!
          </p>
          <Button className="square" size="small" to="/con/2022/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          imageId="attendees"
          title={
            <>
              <strong>700</strong>
              <span>attendees</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">Thank you 700 times!</div>
          <p>
            300 people were in Lille and 400 people from all over the world listened to our talks online. The online
            participation rate has even reached 71%!
          </p>
          <p>Thank you so much!</p>
        </ReviewItem>
        <ReviewItem
          imageId="sponsors"
          title={
            <>
              <strong>12</strong>
              <span>sponsors and partners</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">Our best allies for this event</div>
          <p>
            A huge thank you to our Platinum sponsor{' '}
            <a href="https://www.france.tv/" target="_blank" rel="noreferrer noopener">
              France Télévisions
            </a>{' '}
            for trusting us.
          </p>
          <p>
            Thank you also to our fabulous Gold sponsors{' '}
            <a href="https://sensiolabs.com/fr/" target="_blank" rel="noreferrer noopener">
              Sensiolabs
            </a>
            ,{' '}
            <a href="https://www.alicesgarden.fr/" target="_blank" rel="noreferrer noopener">
              Alice&apos;s Garden
            </a>
            ,{' '}
            <a
              href="https://api-platform.com/con/2022/partners/linkvalue.png"
              target="_blank"
              rel="noreferrer noopener"
            >
              Linkvalue
            </a>
            ,{' '}
            <a
              href="https://api-platform.com/con/2022/partners/platform-sh.png"
              target="_blank"
              rel="noreferrer noopener"
            >
              Platform.sh
            </a>{' '}
            and{' '}
            <a
              href="https://api-platform.com/con/2022/partners/clever-cloud.png"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clever Cloud
            </a>
            .
          </p>
          <p>
            A big thank you to our Bronze sponsors{' '}
            <a href="https://www.rapid-flyer.com/" target="_blank" rel="noreferrer noopener">
              Rapid Flyer
            </a>{' '}
            and{' '}
            <a href="https://fairness.coop/" target="_blank" rel="noreferrer noopener">
              Fairness
            </a>{' '}
            for joining us.
          </p>
          <Button className="square" size="small" to="mailto:events@les-tilleuls.coop">
            Become a partner in 2023
          </Button>
        </ReviewItem>
        <ReviewItem
          imageId="release"
          title={
            <>
              <span>API Platform’s new</span>
              <strong>release</strong>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">An unforgettable edition</div>
          <p>API Platform Con was the occasion to celebrate the release of API Platform 3.</p>
          <p>We hope you enjoy our core team’s work and we can’t wait to hear from your feedback!</p>
        </ReviewItem>
      </div>
    </section>
  );
};

export default ReviewList;
