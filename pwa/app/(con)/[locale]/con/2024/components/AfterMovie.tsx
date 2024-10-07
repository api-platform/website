"use client";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Section from "components/con/home/Section";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";

export default function AfterMovie() {
  const { t, Translate } = useContext(LanguageContext);
  return (
    <Section section="aftermovie">
      <div className="container text-center flex flex-col items-center">
        <SectionTitle dark>
          <Translate translationKey="2024.aftermovie.title" />
        </SectionTitle>
        <SectionSubTitle dark>{t("2024.aftermovie.subtitle")}</SectionSubTitle>
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
  );
}
