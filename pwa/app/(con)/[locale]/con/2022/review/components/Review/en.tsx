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
          edition="2022"
          imageId="days"
          title={
            <>
              <strong>2</strong>
              <span>awesome days</span>
            </>
          }
        >
          <LinedTitle className="mb-5">We doubled the fun</LinedTitle>
          <p>
            This year, the API Platform Con took place over 2 days with still
            two tracks in both languages.
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
            , located at 1 hour from Paris, 30 min from Brussels and 12 hours
            from Montreal!
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="speakers"
          title={
            <>
              <strong>29</strong>
              <span>inspiring speakers</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            They made this event so amazing!
          </LinedTitle>
          <p>
            Some of the best speakers from our ecosystem came from America,
            Africa or Europe and shared their knowledge in English and in
            French.
          </p>
          <p>
            A wide variety of topics were discussed and we’re very proud to have
            welcomed some new speakers who were on stage for the very first
            time!
          </p>
          <Button className="square" size="small" to="/con/2022/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="attendees"
          title={
            <>
              <strong>700</strong>
              <span>attendees</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Thank you 700 times!</LinedTitle>
          <p>
            300 people were in Lille and 400 people from all over the world
            listened to our talks online. The online participation rate has even
            reached 71%!
          </p>
          <p>Thank you so much!</p>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="sponsors"
          title={
            <>
              <strong>12</strong>
              <span>sponsors and partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Our best allies for this event
          </LinedTitle>
          <p>
            A huge thank you to our Platinum sponsor{" "}
            <a
              href="https://www.france.tv/"
              target="_blank"
              rel="noreferrer noopener"
            >
              France Télévisions
            </a>{" "}
            for trusting us.
          </p>
          <p>
            Thank you also to our fabulous Gold sponsors{" "}
            <a
              href="https://sensiolabs.com/fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sensiolabs
            </a>
            ,{" "}
            <a
              href="https://www.alicesgarden.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Alice&apos;s Garden
            </a>
            ,{" "}
            <a
              href="https://positivethinking.tech/fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Linkvalue
            </a>
            ,{" "}
            <a
              href="https://platform.sh/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Platform.sh
            </a>{" "}
            and{" "}
            <a
              href="https://www.clever-cloud.com/fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clever Cloud
            </a>
            .
          </p>
          <p>
            A big thank you to our Bronze sponsors{" "}
            <a
              href="https://www.rapid-flyer.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Rapid Flyer
            </a>{" "}
            and{" "}
            <a
              href="https://fairness.coop/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fairness
            </a>{" "}
            for joining us.
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Become a partner in 2023
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="release"
          title={
            <>
              <span>API Platform’s new</span>
              <strong>release</strong>
            </>
          }
        >
          <LinedTitle className="mb-5">An unforgettable edition</LinedTitle>
          <p>
            API Platform Con was the occasion to celebrate the release of API
            Platform 3.
          </p>
          <p>
            We hope you enjoy our core team’s work and we can’t wait to hear
            from your feedback!
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
