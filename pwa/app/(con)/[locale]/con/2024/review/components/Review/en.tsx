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
    <section ref={reviewRef}>
      <div className="container">
        <ReviewItem
          edition="2024"
          imageId="laravel"
          size="xl"
          title={
            <>
              <strong>1</strong>
              <span>major announcement</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Game-Changing Announcement for the PHP Ecosystem!
          </LinedTitle>
          <p>
            The API Platform Conference kicked off with a major announcement:
            Laravel support is now available with API Platform 4.
          </p>
          <p>
            On the agenda: quick exposure of a REST or GraphQL API from Eloquent
            models, addition of advanced API features (pagination, filters,
            authentication, data validation), compatibility with Octane and{" "}
            <a
              className="link"
              href="https://frankenphp.dev/"
              target="_blank"
              rel="noreferrer noopener"
            >
              FrankenPHP
            </a>{" "}
            for optimal performance, and automatic generation of OpenAPI
            documentation.
          </p>
          <p>
            API Platform offers, more than ever, an elegant and optimized
            experience tailored to all development needs.
          </p>
          <Button className="square" size="small" to="/?s=laravel">
            API Platform for Laravel
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>25</strong>
              <span>High-Level Talks</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Exclusive content sharing, tailored to all levels.
          </LinedTitle>
          <p>
            International figures from the PHP, JavaScript, and Cloud ecosystems
            were present in Lille on September 19 and 20.
          </p>
          <p>
            Talks on AI, best practices, performance, and experience sharing...
            The latest innovations, trends, and best development practices were
            at the heart of this event.
          </p>
          <Button className="square" size="small" to="/con/2024/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="sponsors"
          size="xl"
          title={
            <>
              <strong>25</strong>
              <span>partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            A strong support that greatly contributed to the conference's
            success
          </LinedTitle>
          <p>
            Thank you to our Gold sponsors:{" "}
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
              href="https://marmelab.com/react-admin/"
              target="_blank"
              rel="noreferrer noopener"
            >
              React-admin
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
            ,{" "}
            <a
              className="link"
              href="https://sylius.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sylius
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://www.cgt.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              la CGT.
            </a>
            .
          </p>
          <p>
            Thanks also to our Silver sponsors:{" "}
            <a
              className="link"
              href="https://www.emagma.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              EMAGMA
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
              href="https://www.clever-cloud.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clever Cloud
            </a>
            ,{" "}
            <a
              className="link"
              href="http://WeLoveDevs.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              WeLoveDevs.com
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.codein.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Codéin
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.sweeek.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sweeek
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://fairness.coop/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fairness
            </a>
            .
          </p>
          <p>
            Thank you to our Bronze sponsors:{" "}
            <a
              className="link"
              href="https://darkwood.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Darkwood
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.orbitale.io/en/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Orbitale.io
            </a>{" "}
            et{" "}
            <a
              className="link"
              href="https://learn.web-develop.me/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Lior&nbsp;Chamla
            </a>
            .
          </p>
          <p>
            A special thanks to our sponsors{" "}
            <a
              className="link"
              href="https://twitter.com/BakslashHQ"
              target="_blank"
              rel="noreferrer noopener"
            >
              baksla.sh
            </a>{" "}
            for the lanyards and{" "}
            <a
              className="link"
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL&nbsp;Recrutement
            </a>{" "}
            for the community evening.
          </p>
          <p>
            Finally, thanks to our community and media partners:{" "}
            <a
              className="link"
              href="https://laravel-france.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Laravel France
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.motivher.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Motiv'Her
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.archimag.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Archimag
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.programmez.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Programmez!
            </a>
            ,{" "}
            <a
              className="link"
              href="https://symfony.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Symfony
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.euratechnologies.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Euratechnologies
            </a>{" "}
            ,{" "}
            <a
              className="link"
              href="https://www.bitexpert.de/de"
              target="_blank"
              rel="noreferrer noopener"
            >
              BitExpert
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://www.hotelsdelille.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Hôtels de Lille
            </a>
            .
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Become sponsor in 2025
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="drink"
          title={
            <>
              <strong>1</strong>
              <span>community party</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Celebrating the tech reunion</LinedTitle>
          <p>
            This year again, the community evening was sponsored by{" "}
            <a
              className="link"
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL&nbsp;Recrutement
            </a>
            .
          </p>
          <p>
            To top it off, the beautiful weather was on our side, allowing us to
            enjoy most of the evening on the terrace, under the setting sun.
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
