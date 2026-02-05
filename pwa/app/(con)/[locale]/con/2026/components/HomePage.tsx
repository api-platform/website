"use client";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Venue from "components/con/home/Venue";
import Image from "next/image";
import Wave from "components/con/common/Wave";
import Partners from "components/con/home/Partners";
import LookingSponsorCard from "components/con/home/LookingSponsorCard";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import Section from "components/con/home/Section";
import PictureGallery from "components/con/common/PictureGallery";
import AfterMovie from "../../2025/components/AfterMovie";
import BuyButton from "components/con/common/BuyButton";
import { currentEdition } from "data/con/editions";
import prices from "data/con/2026/prices";
import PricingCard from "components/con/home/Pricing/PricingCard";

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
        <div className="container relative z-10 flex flex-col items-center w-full md:flex-row md:gap-8">
          <div className="w-4/5 my-6 md:mt-0 md:w-1/2 xl:w-[60%] relative">
            <img
              src="/images/con/2026/logo.svg"
              alt="Logo API Platform Conference 2026"
              className="scale-110 translate-y-[10%]"
            />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p className="flex-1 text-lg md:text-xl font-extrabold pb-6 lg:text-3xl md:text-left">
              {t("2026.baseline")}
            </p>
            <div className="flex gap-2">
              {currentEdition === "2026" && (
                <BuyButton className="mr-2" id="cover">
                  {t("buy_tickets")}
                </BuyButton>
              )}
              <Button
                className="empty"
                to={`/${locale}/con/2026/call-for-papers`}
              >
                {t("2026.cfp.button")}
              </Button>
            </div>
          </div>
        </div>
        <Wave className="absolute opacity-30 z-0 bottom-0 h-[60vh] left-1/2 top-[68%] -translate-y-1/2" />
      </Section>
      <Section
        section="lastYear"
        className="bg-white z-10 relative pb-10 overflow-y-clip"
      >
        <div className="container text-center">
          <SectionTitle>
            <Translate translationKey="last_edition.title" />
          </SectionTitle>
          <SectionSubTitle>
            <Translate
              translationKey="last_edition.subtitle"
              translationParams={{
                edition: "2025",
                link: (
                  <a href={`/${locale}/con/2025/review`} className="link">
                    {t("last_edition.subtitle_link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <PictureGallery
            className="py-4"
            link="https://www.flickr.com/photos/194052559@N02/albums/72177720329148577/"
          >
            {images.map((image: string) => (
              <Image
                className="object-cover"
                key={image}
                fill
                src={image}
                alt=""
                sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1536px) 300px, 400px"
              />
            ))}
          </PictureGallery>
        </div>
      </Section>
      <Section
        section="speakers"
        className="bg-grey z-10 relative py-4 overflow-x-hidden"
      >
        <div className="container text-center">
          <SectionTitle h1>
            <Translate translationKey="speakers.title" />
          </SectionTitle>
          <SectionSubTitle>
            <Translate
              translationKey="2026.our_speakers.subtitle"
              translationParams={{
                edition: "2026",
                link: (
                  <a
                    href={`/${locale}/con/2026/call-for-papers`}
                    className="link"
                  >
                    {t("2026.our_speakers.subtitle_link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <SpeakerList speakers={speakers} max={9} />
          {speakers.length > 9 ? (
            <Button
              className="mx-auto my-7"
              to={`/${locale}/con/2026/speakers`}
            >
              {t("speakers.see_all")}
            </Button>
          ) : null}
        </div>
      </Section>
      {currentEdition === "2026" && (
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
      <Venue subtitle={t("2026.venue.subtitle")} />
      <Section section="sponsorship" className="py-8">
        <div className="container text-center">
          <SectionTitle dark>
            <Translate translationKey="sponsorship.title" />
          </SectionTitle>
          <LookingSponsorCard />
        </div>
        <div className="bg-white text-center relative z-10 pt-40 pb-40">
          <div className="container text-center">
            <div className="lined-center lined-blue font-bold uppercase text-2xl text-blue font-title">
              {t("sponsorship.they_trust_us", { year: "2025" })}
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
