"use client";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Venue from "components/con/home/Venue";
import Image from "next/image";
import Partners from "components/con/home/Partners";
import LookingSponsorCard from "components/con/home/LookingSponsorCard";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import Section from "components/con/home/Section";
import Cover from "components/con/home/Cover";
import PictureGallery from "components/con/common/PictureGallery";
import AfterMovie from "../../2025/components/AfterMovie";

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
        date={t("2026.date")}
        baseline={t("2026.baseline")}
        button={
          <Button className="pink" to={`/${locale}/con/2025/review`}>
            {t("review.button")}
          </Button>
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
      <div className="pb-12">
        <AfterMovie />
      </div>
      <Section
        section="missing"
        className="relative z-10 text-center overflow-y-clip"
      >
        <div className="container text-center">
          <SectionTitle dark>
            <Translate
              translationKey="missing_conferences.title"
              translationParams={{ edition: "2025" }}
            />
          </SectionTitle>
          <SectionSubTitle dark>
            <Translate
              translationKey="2026.missing_conferences.subtitle"
              translationParams={{ link: t("2026.missing_conferences.link") }}
            />
          </SectionSubTitle>
          <Button
            className="mx-auto mb-10"
            external
            to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSppJSvwSIeBexYZQWkN0bm"
          >
            {t("2026.missing_conferences.subscribe")}
          </Button>
        </div>
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
              translationKey="2026.our_speakers.subtitle"
              translationParams={{
                edition: "2026",
                link: (
                  <a
                    href="mailto:events@les-tilleuls.coop"
                    className="link"
                    target="_blank"
                    rel="noreferrer nooepener"
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
