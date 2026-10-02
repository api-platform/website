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
              <strong>1</strong>
              <span>édition plus vibrante que jamais</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Sortie d'API Platform 5 et Mercure 1.0
          </LinedTitle>
          <p>
            Kévin Dunglas a présenté Mercure 1.0, la première version stable
            après plusieurs années de développement, qui intègre également de
            nouvelles fonctionnalités majeures.
          </p>
          <p>
            De son côté, Antoine Bluchet a présenté ses récents travaux sur
            l'intégration du MCP dans API Platform, suivis des nouvelles
            fonctionnalités d'API Platform 5.0.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>29</strong>
              <span>conférences passionnantes</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Des contenus exclusifs adaptés à tous les objectifs
          </LinedTitle>
          <p>
            Les voix les plus influentes de l'écosystème PHP (et au-delà) se
            sont réunies pendant deux jours à Lille pour partager leurs
            connaissances, leurs recherches et leurs réflexions, auprès d’un
            public captif et curieux.
          </p>
          <Button className="square" size="small" to="/fr/con/2026/speakers">
            Voir tous les speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="partners"
          size="xl"
          title={
            <>
              <strong>26</strong>
              <span>partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Un immense merci à l'ensemble de nos incroyables sponsors et
            partenaires !
          </LinedTitle>
          <p>
            Un grand merci à nos sponsors Platinum,{" "}
            <a
              className="link"
              href="https://les-tilleuls.coop"
              target="_blank"
              rel="noreferrer noopener"
            >
              Les-Tilleuls.coop
            </a>{" "}
            et{" "}
            <a
              href="https://tilia.coop"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tilia.coop
            </a>
            , créateurs, mainteneurs d'API Platform et organisateurs de la
            conférence.
          </p>
          <p>
            Nous tenons à exprimer notre profonde gratitude à nos sponsors Gold,{" "}
            <a
              href="https://www.francetelevisions.fr/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              France TV
            </a>{" "}
            et{" "}
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
            Merci à nos partenaires Silver :{" "}
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
            </a>{" "}
            et{" "}
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
            Merci également à{" "}
            <a
              href="https://caddyserver.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Caddy
            </a>{" "}
            pour son soutien Bronze.
          </p>
          <p>
            Merci à tous les membres essentiels de notre Communauté :{" "}
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
            </a>{" "}
            et{" "}
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
            Un remerciement particulier à{" "}
            <a
              href="https://www.bitexpert.de/en"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              BitExpert
            </a>{" "}
            et{" "}
            <a
              href="https://www.mongodb.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              MongoDB
            </a>{" "}
            pour avoir pris en charge le déplacement de leurs conférenciers.
          </p>
          <p>
            Enfin, merci à nos partenaires Média{" "}
            <a
              href="https://www.archimag.com/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              Archimag
            </a>{" "}
            et{" "}
            <a
              href="https://www.youtube.com/@alafrench/"
              className="link"
              target="_blank"
              rel="noreferrer noopener"
            >
              À La French
            </a>{" "}
            pour nous avoir aidés à faire connaître et faire vivre cet
            événement.
          </p>
          <Button
            className="square"
            size="small"
            to="mailto:events@les-tilleuls.coop"
          >
            Devenir sponsor en 2027
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="community"
          size="lg"
          title={
            <>
              <strong>1</strong>
              <span>soirée communautaire incontournable</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Un des rendez-vous incontournables de l'événement.
          </LinedTitle>
          <p>
            Comme chaque année, la soirée communautaire s'est déroulée aux Sales
            Mômes, avec le précieux soutien du cabinet{" "}
            <a href="https://www.jlrecrutement.com/">JL Recrutement</a>.
            Boissons, frites et rigolades : le cocktail parfait pour clôturer la
            journée de l'événement.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2026"
          imageId="assistant"
          size="lg"
          title={
            <>
              <strong>1</strong>
              <span>assistant de conférence</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Prêt à vous offrir la meilleure expérience possible
          </LinedTitle>
          <p>
            Cette année lors de la conférence, nous vous avons proposé de
            découvrir notre assistant virtuel, vous permettant de consulter le
            programme, de vérifier les dernières mises à jour, d'évaluer les
            conférences et de composer facilement votre agenda personnel. Nous
            avons déjà hâte d'améliorer cet outil pour l'année prochaine.
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
