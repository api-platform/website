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
              <span>lieu incroyable</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Au coeur de l&apos;Europe...</LinedTitle>
          <p>
            La conférence API Platform s&apos;est tenue à Lille, point de
            rencontre des villes européennes et capitale touristique de la
            région flamande.
          </p>
          <p>
            Les conférences ont été données à{" "}
            <a
              href="https://www.euratechnologies.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Euratechnologies
            </a>
            , le 1er incubateur et accélérateur de startups en France (à
            seulement 1 heure de Paris, 30 minutes de Bruxelles et 10 heures de
            New York ;))
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="speakers"
          title={
            <>
              <strong>15</strong>
              <span>speakers exceptionnels</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Ils sont la clé du succès de cet événement !
          </LinedTitle>
          <p>
            Certains des meilleurs orateurs de notre écosystème étaient sur
            scène et ont partagé leurs connaissances en 2 langues.
          </p>
          <p>
            Une large variété de sujets ont été abordés et nous espérons que nos
            speakers vous auront inspiré pour vos prochains projets.
          </p>
          <p>
            Et même si vous ne l&apos;auriez sans doute jamais deviné, certains
            de nos speakers montaient sur scène pour la toute première fois !
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
              <span>participants</span>
            </>
          }
        >
          <LinedTitle className="mb-5">500 fois merci !</LinedTitle>
          <p>
            150 personnes étaient présentes à Lille et plus de 400 personnes du
            monde entier ont écouté nos conférences sur Livestorm. Le taux de
            participation en ligne a atteint 75 % !
          </p>
          <p>Merci beaucoup !</p>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="sponsors"
          title={
            <>
              <strong>12</strong>
              <span>sponsors et partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Ils ont rendu ce projet possible !
          </LinedTitle>
          <p>
            Cet événement n&apos;aurait pas pu avoir lieu sans nos partenaires,
            comme Saveur Bière, Sensiolabs, Vestiaire Collective, Wine in Black,
            Fairness.coop, Orbitale.io et bien plus encore.
          </p>
          <p>Merci encore !</p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Devenir sponsor en 2023.
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2021"
          imageId="food"
          title={
            <>
              <strong>1</strong>
              <span>buffet végétarien</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Yum!</LinedTitle>
          <p>
            Nous sommes fiers d&apos;avoir servi à notre communauté repas 100%
            végétarienne (et plein de saveurs !)
          </p>
          <p>
            Et nous pensons que vous l&apos;avez apprécié autant que nous : tous
            les plats étaient vides !
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
