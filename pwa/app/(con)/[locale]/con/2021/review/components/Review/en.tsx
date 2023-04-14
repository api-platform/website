"use client";
import React from "react";
import Button from "components/con/common/Button";
import useDynamicRefs from "hooks/con/useDynamicRefs";
import ReviewItem from "components/con/review/ReviewItem";
import LinedTitle from "components/con/common/typography/LinedTitle";

export default function ReviewList() {
  const [, setRef] = useDynamicRefs();
  const reviewRef = setRef("review-list");

  return (
    <section className="pb-36" ref={reviewRef}>
      <div className="container">
        <ReviewItem
          edition="2021"
          imageId="place"
          title={
            <>
              <strong>1</strong>
              <span>amazing place</span>
            </>
          }
        >
          <LinedTitle className="mb-5">In the heart of Europe...</LinedTitle>
          <p>
            API Platform Con took place in Lille, meeting point of European
            cities and touristic capital of the Flemish region.
          </p>
          <p>
            Tracks were given in{" "}
            <a
              href="https://www.euratechnologies.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Euratechnologies
            </a>
            , the 1st incubator & startups accelerator in France (only at 1 hour
            from Paris, 30 min from Brussels and 10 hours from New York ;))
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="speakers"
          title={
            <>
              <strong>15</strong>
              <span>incredible speakers</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            They made this event so amazing!
          </LinedTitle>
          <p>
            Some of the best speakers from our ecosystem were on stage and
            shared their knowledge on 2 languages.
          </p>
          <p>
            A wide variety of topics were discussed and we hope you got
            inspiration to pursue building your web applications.
          </p>
          <p>
            And even if you would never have guessed it, some of them were on
            stage for the very first time!
          </p>
          <Button className="square" size="small" to="/con/2021/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="attendees"
          title={
            <>
              <strong>500</strong>
              <span>attendees</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Thank you 500 times!</LinedTitle>
          <p>
            150 people were in Lille and more than 400 people from all over the
            world listened to our talks on Livestorm. The online participation
            rate has reached 75%!
          </p>
          <p>Thank you so much!</p>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="sponsors"
          title={
            <>
              <strong>12</strong>
              <span>sponsors and partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">They made this possible!</LinedTitle>
          <p>
            This event would not have been possible without our partners such as
            Saveur Bière, Sensiolabs, Vestiaire Collective, Wine in Black,
            Fairness.coop, Orbitale.io and many more.
          </p>
          <p>Thank you again!</p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Become a partner in 2023
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="food"
          title={
            <>
              <strong>1</strong>
              <span>vegetarian buffet</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Yum!</LinedTitle>
          <p>
            We are proud to have served our community vegetarian (and
            nutritious) food.
          </p>
          <p>
            And we think you liked it as much as we did: all the booths were
            empty!
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
