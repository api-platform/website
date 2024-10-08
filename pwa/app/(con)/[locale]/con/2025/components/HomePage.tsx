"use client";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Web from "components/con/common/Web";
import Wave from "components/con/common/Wave";
import Venue from "components/con/home/Venue";
import Image from "next/image";
import Partners from "components/con/home/Partners";
import LookingSponsorCard from "components/con/home/LookingSponsorCard";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import Section from "components/con/home/Section";
import PictureGallery from "components/con/common/PictureGallery";
import Logo from "./Logo";
import AfterMovie from "app/con/2024/components/AfterMovie";

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
            <p className="flex-1 text-sm md:text-md font-extrabold pb-6 lg:text-lg md:text-left">
              {t("2025.subbaseline")}
            </p>
            <div className="flex gap-2">
              <Button className="pink" to={`/${locale}/con/2024/review`}>
                {t("2025.previous_edition")}
              </Button>
            </div>
          </div>
        </div>
        <Wave className="absolute opacity-30 z-0 bottom-0 h-[60vh] right-[7%] top-[63%] -translate-y-1/2" />
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
          <PictureGallery
            className="py-4"
            link="https://www.flickr.com/photos/194052559@N02/albums/72177720320499314/"
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
      <div className="pb-12">
        <AfterMovie />
      </div>
      <Section
        section="missing"
        className="relative z-10 text-center overflow-y-clip bg-white"
      >
        <div className="container text-center">
          <SectionTitle>
            <Translate
              translationKey="missing_conferences.title"
              translationParams={{ edition: "2024" }}
            />
          </SectionTitle>
          <SectionSubTitle>
            <Translate
              translationKey="2025.missing_conferences.subtitle"
              translationParams={{
                link: (
                  <a
                    className="link"
                    href="https://www.youtube.com/@coopTilleuls"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("2025.missing_conferences.link")}
                  </a>
                ),
              }}
            />
          </SectionSubTitle>
          <Button
            className="mx-auto mb-10"
            external
            to="https://www.youtube.com/@coopTilleuls"
          >
            {t("2025.missing_conferences.subscribe")}
          </Button>
        </div>
      </Section>
      <Section
        section="speakers"
        className="z-10 relative py-4 overflow-x-hidden text-white"
      >
        <div className="container text-center">
          <SectionTitle dark h1>
            <Translate translationKey="2025.our_speakers.title" />
          </SectionTitle>
          <SectionSubTitle dark>
            <Translate
              translationKey="2025.our_speakers.subtitle"
              translationParams={{
                edition: "2025",
                link: (
                  <a
                    href="https://forms.gle/kNpkFsEZshYnfJST6"
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
          <SpeakerList speakers={speakers} max={6} />
          {speakers.length > 6 ? (
            <Button
              className="mx-auto my-7"
              to={`/${locale}/con/2025/speakers`}
            >
              {t("speakers.see_all")}
            </Button>
          ) : null}
          <Button className="mx-auto my-7" to={`/${locale}/con/2024/speakers`}>
            {t("2025.our_speakers.see_2024")}
          </Button>
        </div>
      </Section>
      <Venue subtitle={t("2025.venue.subtitle")} />
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
              {t("sponsorship.they_trust_us", { year: "2024" })}
            </div>
            <Partners data={partners} edition="2024" />
          </div>
        </div>
      </Section>
    </>
  );
};

export const revalidate = 43200;

export default HomePage;
