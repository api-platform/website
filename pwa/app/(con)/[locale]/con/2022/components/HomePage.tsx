"use client";
import Cover from "components/con/home/Cover";
import Button from "components/con/common/Button";
import SpeakerList from "components/con/speakers/SpeakerList";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Section from "components/con/home/Section";
import Venue from "components/con/home/Venue";
import Partners from "components/con/home/Partners";
import { Partner, Speaker } from "types/con";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

type HomePageProps = {
  speakers: Speaker[];
  partners: Partner[];
};

export default function HomePage({ speakers, partners }: HomePageProps) {
  const { t, Translate, locale } = useContext(LanguageContext);

  return (
    <>
      <Cover
        date={t("2022.date")}
        baseline={t("2022.baseline")}
        button={
          <Button to={`/${locale}/con`}>{t("back_to_current_edition")}</Button>
        }
      />

      <Section
        section="speakers"
        className="bg-white z-10 relative py-4 overflow-x-hidden"
      >
        <div className="container text-center">
          <SectionTitle h1>
            <Translate translationKey="speakers.title" />
          </SectionTitle>
          <SectionSubTitle>{t("2022.our_speakers.subtitle")}</SectionSubTitle>
          <SpeakerList speakers={speakers} max={12} />
          {speakers.length > 12 ? (
            <Button className="mx-auto my-7" to="/con/2022/speakers">
              {t("speakers.see_all")}
            </Button>
          ) : null}
        </div>
      </Section>

      <Venue subtitle={t("2022.venue.subtitle")} />

      <Section
        className="relative z-10 bg-white pb-64 pt-10 overflow-x-hidden w-full"
        section="partners"
      >
        <div className="container text-center">
          <SectionTitle>
            <Translate translationKey="partners.title" />
          </SectionTitle>
          <Partners data={partners} edition="2022" />
          <Button square empty to="mailto:events@les-tilleuls.coop" external>
            {t("become_sponsor")}
          </Button>
        </div>
      </Section>
    </>
  );
}
