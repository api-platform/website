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
              <span>jours inoubliables</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            La révolution PHP vient de commencer&nbsp;!
          </LinedTitle>
          <p>
            Cette année, nous avons eu l&apos;occasion d’écouter une vingtaine
            de conférences inspirantes.
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
            vient de sortir sa première version bêta. Désormais, la
            documentation d'API Platform s'enrichit d'exemples plus poussés
            exécutables directement dans le navigateur. De nouvelles
            fonctionnalités dans notre écosystème ont été présentées, telles que
            stateOptions et les Symfony Webhooks.
          </p>
          <p>
            Notre conférence a également abordé des sujets essentiels tels que
            l'architecture, la sécurité, des cas d'utilisation et retours
            d'expérience, et même la décentralisation du web&nbsp;!
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="speakers"
          big
          title={
            <>
              <strong>25</strong>
              <span>speakers inspirants</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Un partage de connaissances en continu&nbsp;!
          </LinedTitle>
          <p>
            Les speakers les plus qualifiés de notre écosystème ont répondu à
            l'appel. Qu'ils et elles soient juniors, expérimentés, anglophones
            ou francophones… Tous nous ont offert des contenus riches en
            informations. Nous avons même eu l’opportunité d’écouter 3 lightning
            talks fort intéressants.
          </p>
          <p>
            Nous sommes immensément fiers d’avoir accueilli ce beau monde et
            nous les félicitons encore une fois chaleureusement !
          </p>
          <Button className="square" size="small" to="/fr/con/2023/speakers">
            Voir tous les speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="attendees"
          title={
            <>
              <strong>300</strong>
              <span>fois merci&nbsp;!</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Une communauté qui grandit</LinedTitle>
          <p>
            Plus de 300 personnes étaient sur place à Lille, et 250 personnes à
            travers le monde ont suivi nos conférences. Le taux de participation
            en ligne a même dépassé les 70%.
          </p>
          <p>Merci !</p>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="sponsors"
          big
          title={
            <>
              <strong>14</strong>
              <span>sponsors et partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            L’événement n’aurait pas la même saveur sans eux
          </LinedTitle>
          <p>
            Merci à nos sponsors Gold :{" "}
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
            </a>{" "}
            et{" "}
            <a
              className="link"
              href="https://www.commerceweavers.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Commerce Weavers
            </a>
            .
          </p>
          <p>
            <a
              className="link"
              href="https://www.alicesgarden.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Alice's Garden
            </a>{" "}
            nous fait à nouveau le plaisir de nous rejoindre en tant que sponsor
            Silver.
          </p>
          <p>
            Merci également à nos sponsors Bronze{" "}
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
            </a>{" "}
            et{" "}
            <a
              className="link"
              href="https://www.orbitale.io/en/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Orbitale
            </a>
            de soutenir cet événement.
          </p>
          <p>
            Enfin, saluons nos partenaires communautaires{" "}
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
            et{" "}
            <a
              className="link"
              href="https://www.motivher.fr/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Motiv'Her
            </a>
            .
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Devenir sponsor en 2024
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2023"
          imageId="drink"
          title={
            <>
              <strong>1</strong>
              <span>apéro communautaire</span>
            </>
          }
        >
          <LinedTitle className="mb-5">Un moment plus que convivial</LinedTitle>
          <p>
            Cette année, la soirée communautaire était sponsorisée par le
            cabinet{" "}
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
            Un mélange de punch, de bières, de frites et de bonne humeur a créé
            une ambiance parfaite pour une soirée mémorable !
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
