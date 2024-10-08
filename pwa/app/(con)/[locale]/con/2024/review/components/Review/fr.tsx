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
              <span>annonce majeure</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Séisme dans l'écosystème PHP&nbsp;!
          </LinedTitle>
          <p>
            L’API Platform Conference a démarré avec une annonce de taille : le
            support de Laravel est désormais disponible avec API Platform 4.
          </p>
          <p>
            Au programme : exposition rapide d'une API REST ou GraphQL à partir
            des modèles Eloquent, ajout de fonctionnalités natives et avancées
            (pagination, filtres, authentification, validation des données),
            compatibilité avec Octane et{" "}
            <a
              className="link"
              href="https://frankenphp.dev/"
              target="_blank"
              rel="noreferrer noopener"
            >
              FrankenPHP
            </a>{" "}
            pour des performances optimales, ainsi que génération automatique de
            documentation OpenAPI.
          </p>
          <p>
            API Platform offre, plus que jamais, une expérience de développement
            simple, élégante et adaptée à tous les besoins.
          </p>
          <Button className="square" size="small" to="/?s=laravel">
            Découvrir API Platform Laravel
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>25</strong>
              <span>conférences</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Un partage de contenu inédit, adapté à chaque niveau.
          </LinedTitle>
          <p>
            Des figures internationales des écosystèmes PHP, JavaScript et Cloud
            étaient présentes à Lille les 19 et 20 septembre derniers.
          </p>
          <p>
            Conférences sur l’IA, bonnes pratiques, performances et retours
            d’expérience… Les dernières innovations, les tendances et meilleures
            pratiques de développement étaient au cœur de cet événement.
          </p>
          <Button className="square" size="small" to="/fr/con/2024/speakers">
            Voir tous les speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="sponsors"
          size="xl"
          title={
            <>
              <strong>25</strong>
              <span>partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Un soutien de taille qui contribue grandement au succès de la
            conférence
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
            et{" "}
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
            Merci également à nos sponsors Silver :{" "}
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
            et{" "}
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
            Merci à nos sponsors Bronze :{" "}
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
            Merci aussi à nos sponsors{" "}
            <a
              className="link"
              href="https://twitter.com/BakslashHQ"
              target="_blank"
              rel="noreferrer noopener"
            >
              baksla.sh
            </a>{" "}
            pour les tours de cou et{" "}
            <a
              className="link"
              href="https://www.jlrecrutement.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              JL&nbsp;Recrutement
            </a>{" "}
            pour la soirée communautaire.
          </p>
          <p>
            Enfin, saluons nos partenaires communautaires et média{" "}
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
            et{" "}
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
            Devenir sponsor en 2025
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2024"
          imageId="drink"
          title={
            <>
              <strong>1</strong>
              <span>apéro ensoleillé</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Arroser les retrouvailles de la communauté
          </LinedTitle>
          <p>
            Cette année encore, la soirée communautaire était sponsorisée par le
            cabinet{" "}
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
            Cerise sur le gâteau, le beau temps était au rendez-vous, nous
            permettant de profiter de la majeure partie de la soirée en
            terrasse, sous le soleil couchant.
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
