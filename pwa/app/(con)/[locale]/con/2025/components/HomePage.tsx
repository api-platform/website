"use client";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import { currentEdition } from "data/con/editions";
import Wave from "components/con/common/Wave";
import Venue from "components/con/home/Venue";
import Partners from "components/con/home/Partners";
import LookingSponsorCard from "components/con/home/LookingSponsorCard";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import Section from "components/con/home/Section";
import prices from "data/con/2025/prices";
import Logo from "./Logo";
import PricingCard from "components/con/home/Pricing/PricingCard";
import BuyButton from "components/con/common/BuyButton";

type HomePageProps = {
  speakers: Speaker[];
  partners: Partner[];
  images: string[];
};

const HomePage = ({ speakers, partners, images }: HomePageProps) => {
  const { t, Translate, locale } = useContext(LanguageContext);
  return (
    <>
      <Section
        className="flex flex-col text-white text-center justify-center items-center min-h-screen w-full relative overflow-hidden pt-12 pb-12"
        section="home"
      >
        <div className="container relative z-10 flex flex-col items-center w-full md:flex-row md:gap-12 xl:gap-24">
          <div className="w-4/5 my-6 md:mt-0 md:w-1/2 relative xl:w-[47%]">
            <Logo />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p className="flex-1 text-lg md:text-xl font-extrabold pb-6 lg:text-3xl md:text-left">
              {t("2025.baseline")}
            </p>
            <div className="flex gap-2">
              {currentEdition === "2025" && (
                <BuyButton className="mr-2" id="cover">
                  {t("buy_tickets")}
                </BuyButton>
              )}
            </div>
          </div>
        </div>
        <Wave className="absolute opacity-30 z-0 bottom-0 h-[60vh] right-[7%] top-[63%] -translate-y-1/2" />
      </Section>
      <Section
        section="speakers"
        className="bg-white z-10 relative py-4 overflow-x-hidden"
      >
        <div className="container text-center">
          <SectionTitle h1>
            <Translate translationKey="speakers.title" />
          </SectionTitle>
          <SectionSubTitle>
            <Translate
              translationKey="2025.our_speakers.subtitle"
              translationParams={{
                edition: "2025",
                link: (
                  <a
                    href="https://conference-hall.io/public/event/GMijW4ZrZDo6hzKeF1gk"
                    className="link"
                    target="_blank"
                    rel="noreferrer nooepener"
                  >
                    {t("2025.our_speakers.subtitle_link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <SpeakerList speakers={speakers} max={9} />
          {speakers.length > 9 ? (
            <Button
              className="mx-auto my-7"
              to={`/${locale}/con/2025/speakers`}
            >
              {t("speakers.see_all")}
            </Button>
          ) : null}
        </div>
      </Section>
      <Section
        section="lastYear"
        className=" z-10 relative pb-10 overflow-y-clip"
      >
        <div className="container text-center flex flex-col items-center pt-12">
          <SectionTitle dark>
            <Translate translationKey="last_edition.title" />
          </SectionTitle>
          <SectionSubTitle dark>
            <Translate
              translationKey="2025.see_review.subtitle"
              translationParams={{
                edition: "2024",
                link: (
                  <a href={`/${locale}/con/2024/review`} className="link">
                    {t("2025.see_review.link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <iframe
            className="aspect-video w-full max-w-2xl border-white border-8 shadow-2xl"
            src="https://www.youtube.com/embed/XXj8NCvLuis?si=hWGWKS81UriUkJ3R&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Section>
      <Venue
        subtitle={t("2025.venue.subtitle")}
        tip_title={t("2025.venue.tip_title")}
        tip={t("2025.venue.tip", {
          tip_link: (
            <a className="link" href="https://www.hotelsdelille.com/">
              {t("2025.venue.tip_link")}
            </a>
          ),
        })}
      />
      <Section
        section="missing"
        className="relative z-10 text-center overflow-y-clip pt-4"
      >
        <div className="container text-center">
          <SectionTitle dark>
            <Translate
              translationKey="missing_conferences.title"
              translationParams={{ edition: "2024" }}
            />
          </SectionTitle>
          <SectionSubTitle dark>
            {t("missing_conferences.subtitle")}
          </SectionSubTitle>
          <Button
            className="mx-auto mb-10"
            external
            to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSppJSvwSIeBexYZQWkN0bm"
          >
            {t("missing_conferences.watch_the_conferences")}
          </Button>
        </div>
      </Section>
      <Section
        section="partners"
        className="bg-white text-center relative z-10 pb-40 pt-20"
      >
        <div className="container text-center">
          <div className="lined-center lined-blue font-bold uppercase text-2xl text-blue font-title">
            <Translate translationKey="partners.title" />
          </div>
          <Partners data={partners} edition="2025" />
        </div>
      </Section>
    </>
  );
};

export const revalidate = 43200;

export default HomePage;
