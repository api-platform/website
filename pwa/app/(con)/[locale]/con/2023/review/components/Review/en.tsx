/* eslint-disable react/no-unescaped-entities */
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
          edition="2023"
          imageId="days"
          big
          title={
            <>
              <strong>2</strong>
              <span>unforgettable days</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            The PHP revolution has just begun!
          </LinedTitle>
          <p>
            This year, we had the opportunity to listen to about twenty
            inspiring conferences.
          </p>
          <p>
            <a
              className="link"
              href="https://frankenphp.dev/"
              target="_blank"
              rel="noreferrer noopener"
            >
              FrankenPHP
            </a>{" "}
            has just released its first beta version. Now, the API Platform
            documentation is enriched with more advanced, executable examples
            directly in the browser. New features in our ecosystem were
            presented, such as stateOptions or Symfony Webhooks.
          </p>
          <p>
            Our conference also covered essential topics such as architecture,
            security, use cases and experiences, and even web decentralization!
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="speakers"
          big
          title={
            <>
              <strong>25</strong>
              <span>amazing speakers</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Continuous knowledge sharing</LinedTitle>
          <p>
            The most qualified speakers from our ecosystem answered the call.
            Whether they were junior or experienced, English-speaking or
            French-speaking... All of them provided us with amazing content. We
            even had the opportunity to listen to 3 very interesting lightning
            talks!
          </p>
          <p>We warmly congratulate our speakers once again!</p>
          <Button className="square" size="small" to="/fr/con/2023/speakers">
            Our 2023 speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="attendees"
          title={
            <>
              <strong>300</strong>
              <span>times thank you!</span>
            </>
          }
        >
          <LinedTitle className="mb-5">A growing community</LinedTitle>
          <p>
            Over 300 people were present in Lille, and 250 people from around
            the world tuned into our conferences. The online participation rate
            even exceeded 70%!
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="sponsors"
          big
          title={
            <>
              <strong>14</strong>
              <span>sponsors and partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            The event wouldn't have the same without them
          </LinedTitle>
          <p>
            Thank you to{" "}
            <a
              className="link"
              href="https://sensiolabs.com/fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sensiolabs
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.francetelevisions.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              France Télévisions
            </a>
            ,
            <a
              className="link"
              href="https://platform.sh/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Platform.sh
            </a>
            ,{" "}
            <a
              className="link"
              href="https://bump.sh/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Bump.sh
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.commerceweavers.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Commerce Weavers
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.alicesgarden.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Alice's Garden
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.akawaka.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Akawaka
            </a>
            ,{" "}
            <a
              className="link"
              href="https://fairness.coop/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fairness
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.orbitale.io/en/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Orbitale
            </a>
            ,{" "}
            <a
              className="link"
              href="https://alximy.io/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Alximy
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL Recrutement
            </a>
            ,{" "}
            <a
              className="link"
              href="https://welovedevs.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              WeLoveDevs
            </a>
            ,{" "}
            <a
              className="link"
              href="https://afup.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              AFUP
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://www.motivher.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Motiv'Her
            </a>{" "}
            for their trust.
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Become a sponsor in 2024
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="drink"
          title={
            <>
              <strong>1</strong>
              <span>unforgettable community drink</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Let’s raise a toast to the API Platform community!
          </LinedTitle>
          <p>
            This year, the community evening was sponsored by{" "}
            <a
              className="link"
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL Recrutement
            </a>
            .
          </p>
          <p>
            A mix of punch, beers, fries, and good vibes created the perfect
            atmosphere for a memorable evening!
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
