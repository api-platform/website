"use client";
import React, { useContext } from "react";
import Section from "components/con/home/Section";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Button from "components/con/common/Button";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function MissingConferences() {
  const { t, Translate } = useContext(LanguageContext);

  return (
    <Section className="py-5 relative overflow-hidden" section="missing">
      <div className="container text-center">
        <SectionTitle dark>
          <Translate translationKey="missing_conferences.title" />
        </SectionTitle>
        <SectionSubTitle dark>
          {t("missing_conferences.subtitle")}
        </SectionSubTitle>
        <Button
          to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4"
          external
        >
          {t("missing_conferences.watch_the_conferences")}
        </Button>
      </div>
    </Section>
  );
}
