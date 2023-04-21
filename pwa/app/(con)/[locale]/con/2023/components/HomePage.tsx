"use client";
import Cover from "components/con/home/Cover";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Section from "components/con/home/Section";
import Venue from "components/con/home/Venue";
import Partners from "components/con/home/Partners";
import Image from "next/image";
import PictureGallery from "components/con/common/PictureGallery";
import LookingSponsorCard from "components/con/home/LookingSponsorCard";
import { currentEdition } from "data/con/editions";
import BuyButton from "components/con/common/BuyButton";
import PricingCard from "components/con/home/Pricing/PricingCard";
import prices from "data/con/2023/prices";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

type HomePageProps = {
  speakers: Speaker[];
  partners: Partner[];
  images: string[];
};

const HomePage = ({ speakers, partners, images }: HomePageProps) => {
  const { t, Translate, locale } = useContext(LanguageContext);
  return (
    <>
      <Cover
        date={t("2023.date")}
        baseline={t("2023.baseline")}
        button={
          <div className="flex">
            {currentEdition === "2023" && (
              <BuyButton className="mr-2" id="cover">
                {t("buy_tickets")}
              </BuyButton>
            )}
          </div>
        }
      />
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
                edition: "2022",
                link: (
                  <a href={`/${locale}/con/2022/review`} className="link">
                    {t("last_edition.subtitle_link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <PictureGallery
            className="py-4"
            link="https://www.flickr.com/photos/194052559@N02/albums/72177720302238684"
          >
            {images.map((image: string) => (
              <Image
                className="object-cover"
                key={image}
                fill
                src={image}
                alt=""
                sizes="400px"
              />
            ))}
          </PictureGallery>
        </div>
      </Section>
      <Section
        section="missing"
        className="relative z-10 text-center overflow-y-clip"
      >
        <div className="container text-center">
          <SectionTitle dark>
            <Translate
              translationKey="missing_conferences.title"
              translationParams={{ edition: "2022" }}
            />
          </SectionTitle>
          <SectionSubTitle dark>
            {t("missing_conferences.subtitle")}
          </SectionSubTitle>
          <Button
            className="mx-auto mb-10"
            external
            to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4"
          >
            {t("missing_conferences.watch_the_conferences")}
          </Button>
        </div>
      </Section>
      <Section
        section="speakers"
        className="bg-white z-10 relative py-4 overflow-hidden"
      >
        <div className="container text-center">
          <SectionTitle>
            <Translate translationKey="speakers.title" />
          </SectionTitle>
          <SectionSubTitle>
            <Translate
              translationKey="2023.our_speakers.subtitle"
              translationParams={{
                edition: "2023",
                link: (
                  <a
                    href="mailto:events@les-tilleuls.coop?subject=I%20want%20to%20be%20a%20speaker!"
                    className="link"
                  >
                    {t("2023.our_speakers.subtitle_link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <SpeakerList speakers={speakers} max={12} />
          {speakers.length > 12 ? (
            <Button
              className="mx-auto my-7"
              to={`/${locale}/con/2023/speakers`}
            >
              {t("speakers.see_all")}
            </Button>
          ) : null}
        </div>
      </Section>
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
      <Venue subtitle={t("2023.venue.subtitle")} />
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
              {t("sponsorship.they_trust_us", { year: "2022" })}
            </div>
            <Partners data={partners} edition="2022" />
          </div>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
