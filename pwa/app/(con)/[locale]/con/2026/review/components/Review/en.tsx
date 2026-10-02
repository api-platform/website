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
          edition="2026"
          imageId="buzz"
          size="lg"
          title={
            <>
              <strong>6th</strong>
              <span>edition buzzin’</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            API Platform 5 and Mercure 1.0 released
          </LinedTitle>
          <p>
            Kévin Dunglas introduced Mercure 1.0, the first stable release
            following years of development, which also packs major new features.
          </p>
          <p>
            Antoine Bluchet showcased his recent work on integrating MCP into
            API Platform, followed by the new features in API Platform 5.0.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>29</strong>
              <span>amazing talks</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Exclusive contents for every objective.
          </LinedTitle>
          <p>
            In Lille last September, the most influential voices in the PHP
            ecosystem (and beyond) gathered to share their knowledge, research,
            and insights, with strong representation from tech communities
            throughout the event.
          </p>
          <Button className="square" size="small" to="/con/2026/speakers">
            See all speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="partners"
          size="xl"
          title={
            <>
              <strong>26</strong>
              <span>partners</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            A huge thank you to all our incredible sponsors and partners for
            making this edition possible.
          </LinedTitle>
          <p>
            A massive shoutout to our Platinum sponsors,{" "}
            <a
              className="link"
              href="https://les-tilleuls.coop"
              target="_blank"
              rel="noreferrer noopener"
            >
              Les-Tilleuls.coop
            </a>{" "}
            and{" "}
            <a
              href="https://tilia.coop"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tilia.coop
            </a>
            , API Platform creators, maintainers, and organizers of the
            conference.
          </p>
          <p>
            We’d like to express our deepest gratitude to our Gold sponsors,{" "}
            <a
              href="https://www.francetelevisions.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              France TV
            </a>{" "}
            and{" "}
            <a
              href="https://laravel.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Laravel
            </a>
            .
          </p>
          <p>
            Thank you to our Silver partners:{" "}
            <a
              href="https://baksla.sh/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Bakslash
            </a>
            ,{" "}
            <a
              href="https://sensiolabs.com/fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              SensioLabs
            </a>
            ,{" "}
            <a
              href="https://www.sweeek.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sweeek
            </a>
            ,{" "}
            <a
              href="https://vonage.dev/APIPlatformConf"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vonage
            </a>
            ,{" "}
            <a
              href="https://www.clever-cloud.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clever Cloud
            </a>
            ,{" "}
            <a
              href="https://www.peinture.app/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Peinture
            </a>
            ,{" "}
            <a
              href="https://packagist.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Packagist
            </a>
            ,{" "}
            <a
              href="https://www.les-scop-hautsdefrance.coop/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              UR SCOP
            </a>
            , and{" "}
            <a
              href="https://cooptech.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              CoopTech
            </a>
            .
          </p>
          <p>
            Thank you as well to{" "}
            <a
              href="https://caddyserver.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Caddy
            </a>{" "}
            for their Bronze support.
          </p>
          <p>
            Thank you to all the vital members of our Community:{" "}
            <a
              href="https://www.emagma.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Emagma
            </a>
            ,{" "}
            <a
              href="https://www.jlrecrutement.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL Recrutement
            </a>
            ,{" "}
            <a
              href="https://larabelles.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Larabelles
            </a>
            ,{" "}
            <a
              href="https://typesense.org/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Typesense
            </a>
            ,{" "}
            <a
              href="https://symfony.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Symfony
            </a>
            ,{" "}
            <a
              href="https://www.motivher.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Motiv'Her
            </a>
            ,{" "}
            <a
              href="https://www.euratechnologies.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              EuraTechnologies
            </a>
            , and{" "}
            <a
              href="https://laravel-france.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Laravel France
            </a>
            .
          </p>
          <p>
            Special thanks to{" "}
            <a
              href="https://www.bitexpert.de/en"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              BitExpert
            </a>{" "}
            and{" "}
            <a
              href="https://www.mongodb.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              MongoDB
            </a>{" "}
            for their Travel support.
          </p>
          <p>
            Finally, thank you to our Media partners{" "}
            <a
              href="https://www.archimag.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Archimag
            </a>{" "}
            and{" "}
            <a
              href="https://www.youtube.com/@alafrench/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              À La French
            </a>{" "}
            for helping us spread the word and bring this event to life.
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Become a sponsor in 2027
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="community"
          size="lg"
          title={
            <>
              <strong>1</strong>
              <span>unmatched community party</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            One of the unmissable gatherings of the event.
          </LinedTitle>
          <p>
            As every year, the community party took place at Les Sales Mômes,
            with the precious support of{" "}
            <a href="https://www.jlrecrutement.com/">JL Recrutement</a>. Drinks,
            French fries, and laughs: the perfect cocktail to end the first day
            of the event.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="assistant"
          size="lg"
          title={
            <>
              <strong>1</strong>
              <span>conference assistant</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Ready to give you the best experience
          </LinedTitle>
          <p>
            This year at the conference, we gave you the opportunity to discover
            our event companion! It allowed you to explore the program, check
            last-minute updates, rate talks, and easily build your personal
            agenda. We’re already looking forward to improving this tool for
            next year!
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
