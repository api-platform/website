import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Button from '@con/common/Button';
import ReviewItem from './ReviewItem';

const Review: React.ComponentType = () => (
  <>
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
          <span>2021 edition</span>
          <span className="uppercase">The review</span>
        </h1>
        <p className="review__cover-text">
          Thank you again for joining and trusting us on this first edition!
          <br />
          We are looking forward to seeing you all again next year.
        </p>
        <div className="review__cover-buttons">
          <Button to="/con">2021 review</Button>
          <Button empty to="/con/2021/archive">
            2021 archive
          </Button>
        </div>
      </div>
    </section>
    <section className="conf__review-list">
      <div className="container">
        <ReviewItem
          imageId="place"
          title={
            <>
              <strong>1</strong>
              <span>amazing place</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">At the crossroads of Europe...</div>
          <p>
            API Platform Con took place in Lille, meeting point of European cities and touristic capital of the Flemish
            region.
          </p>
          <p>
            Tracks were given in{' '}
            <a href="https://www.euratechnologies.com/" target="_blank" rel="noreferrer noopener">
              Euratechnologies
            </a>
            , the 1st incubator & startups accelerator in France (only at 1 hour from Paris, 30 min from Brussels and 10
            hours from New York ;))
          </p>
        </ReviewItem>
        <ReviewItem
          imageId="speakers"
          title={
            <>
              <strong>15</strong>
              <span>incredible speakers</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">They made this event so amazing !</div>
          <p>Some of the best speakers from our ecosystem were on stage and shared their knowledge on 2 languages.</p>
          <p>They amazed us, pushed our thoughts in new directions and inspired us with their ideas.</p>
          <p>And even if we would never have guessed it, some of them were on stage for the very first time!</p>
          <Button className="square" size="small" to="/con/2021/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          imageId="attendees"
          title={
            <>
              <strong>500</strong>
              <span>attendees</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">Thank you 500 times !</div>
          <p>
            150 people were in Lille and more than 400 people from all over the world listened to our talks on
            Livestorm. The online participation rate has reached 75%!
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
          <div className="h5 lined lined-left mb-20 font-bold">They made this possible!</div>
          <p>
            This event would not have been possible without our partners such as Saveur Bière, Sensiolabs, Vestiaire
            Collective, Wine in Black, Fairness.coop, Orbitale.io and many more.
          </p>
          <p>Thank you again!</p>
          <Button className="square" size="small" to="mailto:event@les-tilleuls.coop">
            Become a partner
          </Button>
        </ReviewItem>
        <ReviewItem
          imageId="food"
          title={
            <>
              <strong>1</strong>
              <span>vegetarian buffet</span>
            </>
          }
        >
          <div className="h5 lined lined-left mb-20 font-bold">Yum!</div>
          <p>We are proud to have served our community vegetarian (and nutritious) food.</p>
          <p>And we think you liked it as much as we did: all the booths were empty!</p>
        </ReviewItem>
      </div>
    </section>
  </>
);

export default Review;
