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
              <Button className="pink" to={`/${locale}/con`}>
                {t("back_to_current_edition")}
              </Button>
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
      {currentEdition === "2025" && (
        <Section
          className="relative py-10 before:bg-grey before:h-[calc(100%-500px)] before:absolute before:left-0 before:bottom-0 before:w-full after:bg-wave2 after:w-[1300px] after:h-[800px] after:absolute after:top-24 after:left-1/2 after:bg-top after:bg-contain after:opacity-50 after:bg-no-repeat after:-translate-x-1/2 after:rotate-6"
          section="pricing"
        >
          <div className="container relative z-10">
            <SectionTitle dark>
              <Translate translationKey="pricing.title" />
            </SectionTitle>
            <div className="max-w-4xl mx-auto flex flex-row flex-wrap justify-center">
              {prices.map((price) => (
                <PricingCard key={price.id} price={price} />
              ))}
              <div className="w-full self-center max-w-md mt-10 | lg:pl-10 lg:mt-0 lg:w-1/3">
                <div className="p-5 dotted-corner flex flex-col items-center text-center bg-blue bg-blue-gradient shadow-md border-blue-dark border-4">
                  <span className="font-bold text-white leading-tight font-title uppercase lined-center lined-white relative">
                    {t("pricing.student")}
                  </span>
                  <div className="mt-2 text-blue-black/80 font-semibold">
                    <Translate translationKey="pricing.free_ticket" />
                  </div>
                  <Button
                    size="small"
                    square
                    className="white mt-2 mb-5"
                    to="mailto:events@les-tilleuls.coop"
                  >
                    {t("contact_us")}
                  </Button>
                  <small className="text-xs text-blue-black/50 font-bold">
                    *{t("pricing.certificate_needed")}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
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
      <Section
        section="missing"
        className="relative bg-grey z-10 text-center overflow-y-clip"
      >
        <div className="container text-center">
          <SectionTitle>
            <Translate
              translationKey="missing_conferences.title"
              translationParams={{ edition: "2024" }}
            />
          </SectionTitle>
          <SectionSubTitle>{t("missing_conferences.subtitle")}</SectionSubTitle>
          <Button
            className="mx-auto mb-10"
            external
            to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSppJSvwSIeBexYZQWkN0bm"
          >
            {t("missing_conferences.watch_the_conferences")}
          </Button>
        </div>
      </Section>
      <Section section="sponsorship" className="py-8">
        <div className="container text-center">
          <SectionTitle dark>
            <Translate translationKey="sponsorship.title" />
          </SectionTitle>
          <LookingSponsorCard />
        </div>
        <div
          id="partners"
          className="bg-white text-center relative z-10 pt-40 pb-40"
        >
          <div className="container text-center">
            <div className="lined-center lined-blue font-bold uppercase text-2xl text-blue font-title">
              <Translate translationKey="partners.title" />
            </div>
            <Partners data={partners} edition="2025" />
          </div>
        </div>
      </Section>
    </>
  );
};

export const revalidate = 43200;

export default HomePage;
