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
              <span>ans d'innovation</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Et toujours de grandes ambitions pour l’écosystème PHP
          </LinedTitle>
          <p>
            La keynote d’ouverture a dévoilé plusieurs annonces majeures :
            FrankenPHP et API Platform vont bénéficier de nouvelles
            fonctionnalités puissantes, notamment le support de gRPC (permettant
            des API plus rapides et performantes), la possibilité d’écrire des
            extensions PHP en Go, ainsi qu’une intégration avec des capacités
            temps réel.
          </p>
          <p>
            Ces innovations ouvrent de nouvelles perspectives passionnantes pour
            la communauté PHP, notamment en termes de performance, de
            scalabilité et d’interopérabilité avec d’autres technologies.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="speakers"
          size="lg"
          title={
            <>
              <strong>33</strong>
              <span>Conférences</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Du contenu exclusif pour tous les niveaux
          </LinedTitle>
          <p>
            Les 18 et 19 septembre, Lille a été le point de rendez-vous des
            grandes figures de l’écosystème PHP. Au programme : les dernières
            innovations et tendances du web moderne, mises à l’honneur tout au
            long de l’événement.
          </p>
          <Button className="square" size="small" to="/fr/con/2025/speakers">
            Voir tous les speakers
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="sponsors"
          size="xl"
          title={
            <>
              <strong>33</strong>
              <span>partenaires</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Des soutiens venus de tous les horizons
          </LinedTitle>
          <p>
            Un immense merci à nos sponsors Gold :{" "}
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
            et{" "}
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
            Merci également à nos sponsors Silver :{" "}
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
              href="https://www.upsun.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Upsun
            </a>
            .
          </p>
          <p>
            Nous sommes reconnaissants du soutien de nos sponsors Bronze{" "}
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
            Un grand merci à nos sponsors Copper :{" "}
            <a
              className="link"
              href="https://www.forkit.community/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Fork it!
            </a>{" "}
            et{" "}
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
            Enfin, nous tenons à remercier nos partenaires communautaires et
            médias :{" "}
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
            </a>
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
            Devenir sponsor en 2026
          </Button>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="elephant"
          title={
            <>
              <strong>300</strong>
              <span>elePHPants lâchés dans la nature</span>
            </>
          }
        >
          <LinedTitle className="mb-5">It’s alive!</LinedTitle>
          <p>
            Les elePHPants FrankenPHP ont vu le jour et rencontré leurs premiers
            humains lors de la conférence. Ils ont été adoptés en un rien de
            temps !
          </p>
          <p>
            Nos petits monstres feront leur retour lors de prochains événements.
            Restez à l’affût de leur prochaine apparition en nous suivant sur
            les réseaux sociaux.
          </p>
        </ReviewItem>
        <ReviewItem
          edition="2025"
          imageId="community"
          title={
            <>
              <strong>1</strong>
              <span>fête d’anniversaire mémorable</span>
            </>
          }
        >
          <LinedTitle className="mb-5">
            Joyeux anniversaire API Platform !
          </LinedTitle>
          <p>
            Nous avons célébré les 10 ans d’API Platform en musique, avec un
            spectacle de magie, et soufflé les bougies sur un gâteau
            d’anniversaire flamboyant !
          </p>
          <p>
            Et comme chaque année, les boissons (et le fameux punch !) étaient
            offerts par le cabinet{" "}
            <a href="https://www.jlrecrutement.com/">JL Recrutement</a>. Un
            immense merci à eux !
          </p>
        </ReviewItem>
      </div>
    </section>
  );
}
