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
              <span>jours incroyables</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Nous avons doublé le plaisir !
          </LinedTitle>
          <p>
            Cette année, la conférence API Platform s&apos;est tenue sur deux
            jours, avec toujours deux tracks dans deux langues.
          </p>
          <p>
            Les conférences se sont tenues à{" "}
            <a
              href="https://www.euratechnologies.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Euratechnologies
            </a>
            , situé à 1h de Paris, 30 minutes de Bruxelles et 12 heures de
            Montréal !
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="speakers"
          title={
            <>
              <strong>29</strong>
              <span>speakers inspirants</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Si cet événement est si exceptionnel, c&apos;est grâce à eux !
          </LinedTitle>
          <p>
            Certains parmi les meilleurs speakers de notre écosystème se sont
            déplacés depuis l&apos;Amérique, l&apos;Afrique ou l&apos;Europe
            pour partager leurs connaissances en anglais et en français.
          </p>
          <p>
            Une grande variété de sujets a été abordée, et nous sommes vraiment
            fiers d&apos;avoir accueilli des speakers qui s&apos;exprimaient sur
            scène pour la toute première fois ! Bravo à eux.
          </p>
          <Button className="square" size="small" to="/fr/con/2022/speakers">
            Voir tous les speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="attendees"
          title={
            <>
              <strong>700</strong>
              <span>participants</span>
            </>
          }
        >
          <LinedTitle className="mb-5">700 fois merci !</LinedTitle>
          <p>
            300 participants étaient sur place à Lille et 400 personnes à
            travers le monde ont écouté nos talks en ligne. Le taux de
            participation en ligne a dépassé les 70% !
          </p>
          <p>Merci à vous !</p>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="sponsors"
          title={
            <>
              <strong>12</strong>
              <span>sponsors et partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Nos meilleurs alliés pour cet événement
          </LinedTitle>
          <p>
            Un grand merci à notre sponsor platine{" "}
            <a
              href="https://www.france.tv/"
              target="_blank"
              rel="noreferrer noopener"
            >
              France Télévisions
            </a>{" "}
            pour sa confiance.
          </p>
          <p>
            Merci également à nos fabuleux Gold sponsors{" "}
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
            et{" "}
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
            Un grand merci à nos sponsors Bronze{" "}
            <a
              href="https://www.rapid-flyer.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Rapid Flyer
            </a>{" "}
            et{" "}
            <a
              href="https://fairness.coop/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fairness
            </a>{" "}
            pour nous avoir accompagné dans cette aventure.
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Devenir sponsor en 2023
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2022"
          imageId="release"
          title={
            <>
              <span>API Platform</span>
              <strong>V3</strong>
            </>
          }
        >
          <LinedTitle className="mb-5">Une édition inoubliable</LinedTitle>
          <p>
            La conférence API Platform a été l&apos;occasion de célébrer la
            sortie d&apos;API Platform 3.
          </p>
          <p>
            Nous espérons que vous apprécierez le travail de notre Core Team et
            nous sommes impatients d&apos;avoir vos retours sur cette nouvelle
            version !
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
