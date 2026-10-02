"use client";
import { useContext } from "react";
import Image from "next/image";
import Cover from "components/con/home/Cover";
import Button from "components/con/common/Button";
import Section from "components/con/home/Section";
import PictureGallery from "components/con/common/PictureGallery";
import SectionTitle from "components/con/common/typography/SectionTitle";
import ContactCard from "components/con/layout/ContactCard";
import AfterMovie from "app/con/2026/components/AfterMovie";
import { LanguageContext } from "contexts/con/LanguageContext";

type HomePageProps = {
  images: string[];
};

export default function HomePage({ images }: HomePageProps) {
  const { t, Translate, locale } = useContext(LanguageContext);

  return (
    <>
      <Cover
        date={t("con_home.date")}
        baseline={t("con_home.baseline")}
        button={
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="pink" to={`/${locale}/con/editions`}>
              {t("nav.links.previous_editions")}
            </Button>
            <Button to={`/${locale}/con/2026/review`}>
              {t("con_home.review")}
            </Button>
          </div>
        }
      />
      <Section
        className="bg-white overflow-hidden relative pb-10"
        section="lastyear"
      >
        <div className="container">
          <SectionTitle>
            <Translate translationKey="last_edition.title" />
          </SectionTitle>
        </div>
        <PictureGallery link="https://www.flickr.com/photos/194052559@N02/albums/72177720335675015">
          {images.map((image) => (
            <Image
              className="object-cover"
              key={image}
              fill
              src={image}
              alt="API Platform Conference 2026"
              sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1536px) 300px, 400px"
            />
          ))}
        </PictureGallery>
      </Section>
      <div className="py-12 pb-48">
        <AfterMovie />
      </div>
      <ContactCard />
    </>
  );
}
