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
          edition="2025"
          imageId="10years"
          size="xl"
          title={
            <>
              <strong>10</strong>
              <span>years of innovation</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Major announcements made</LinedTitle>
          <p>
            The opening keynote brought some major announcements: FrankenPHP and
            API Platform are getting powerful new features — including support
            for gRPC (enabling faster, high-performance APIs), the ability to
            write PHP extensions in Go, and integration with real-time
            capabilities.
          </p>
          <p>
            These innovations open up exciting new possibilities for the PHP
            community, particularly in terms of performance, scalability, and
            interoperability with other technologies.
          </p>
          <p>
            API Platform offers, more than ever, an elegant and optimized
            experience tailored to all development needs.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>33</strong>
              <span>High-Level Talks</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Exclusive content for all skill levels
          </LinedTitle>
          <p>
            Lille welcomed key figures from the PHP ecosystem on September 18
            and 19, as the latest innovations and trends in modern development
            took center stage at the event.
          </p>
          <Button className="square" size="small" to="/con/2025/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="sponsors"
          size="xl"
          title={
            <>
              <strong>33</strong>
              <span>partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Partners from across the ecosystem
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
              href="https://sylius.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sylius
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://www.ibexa.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Ibexa
            </a>
            .
          </p>
          <p>
            Thanks also to our Silver sponsors:{" "}
            <a
              className="link"
              href="https://packagist.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Packagist
            </a>
            ,{" "}
            <a
              className="link"
              href="https://vonage.dev/APIPlatformConf"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vonage
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.nrb.be/"
              target="_blank"
              rel="noreferrer noopener"
            >
              NRB Group
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
              href="https://yce.perfectcorp.com/fr/ai-api?utm_source=event&utm_medium=website&utm_campaign=API_Conference&utm_content=2025"
              target="_blank"
              rel="noreferrer noopener"
            >
              Perfect Corp
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
              href="https://smtp.dev/"
              target="_blank"
              rel="noreferrer noopener"
            >
              SMTP Labs
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.emagma.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Emagma
            </a>{" "}
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
              href="https://www.upsun.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Upsun
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
              href="https://baksla.sh/"
              target="_blank"
              rel="noreferrer noopener"
            >
              baksla.sh
            </a>{" "}
            ,{" "}
            <a
              className="link"
              href="https://devcv.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sylvain Combraque
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.cbainfo.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              CBA Informatique
            </a>{" "}
            and{" "}
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
            Many thanks to our Copper sponsors:{" "}
            <a
              className="link"
              href="https://www.forkit.community/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fork it!
            </a>{" "}
            and{" "}
            <a
              className="link"
              href="https://tdutrion.dev/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Thomas Dutrion
            </a>
            .
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
              href="https://symfony.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Symfony
            </a>
            ,{" "}
            <a
              className="link"
              href="https://mobilizon.fr/@chtitedev"
              target="_blank"
              rel="noreferrer noopener"
            >
              ChtiteDev
            </a>
            ,{" "}
            <a
              className="link"
              href="https://phpxbru.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              PHP Brussels
            </a>
            ,{" "}
            <a
              className="link"
              href="https://welovedevs.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              WeLoveDevs
            </a>{" "}
            ,{" "}
            <a
              className="link"
              href="https://larabelles.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Larabelles
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
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL Recrutement
            </a>
            ,{" "}
            <a
              className="link"
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              MongoDB
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
            Become sponsor in 2026
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="elephant"
          title={
            <>
              <strong>300</strong>
              <span>elephants unleashed</span>
            </>
          }
        >
          <LinedTitle className="mb-5">It’s alive!</LinedTitle>
          <p>
            FrankenPHP ElePHPants came to life and met their first humans during
            the conference. The merch sold out in no time!
          </p>
          <p>
            Our little monsters will return at future events. Stay tuned for
            their next release by following us on social media!
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="community"
          title={
            <>
              <strong>1</strong>
              <span>birthday party</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Happy birthday to API Platform!
          </LinedTitle>
          <p>
            We marked API Platform’s 10th anniversary in style with music, a
            magic show, and a beautiful birthday cake.
          </p>
          <p>
            As always, community drinks were sponsored by{" "}
            <a href="https://www.jlrecrutement.com/">JL Recrutement</a>, thank
            you to them!
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
