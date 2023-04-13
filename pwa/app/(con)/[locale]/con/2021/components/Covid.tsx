import React, { PropsWithChildren, useContext } from "react";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Section from "components/con/home/Section";
import Warning from "components/con/home/Warning";
import SectionSubtitle from "components/con/common/typography/SectionSubtitle";
import { LanguageContext } from "contexts/con/LanguageContext";

interface CovidMeasureProps extends PropsWithChildren {
  icon: string;
  alt: string;
}

function CovidMeasure({ icon, alt, children }: CovidMeasureProps) {
  return (
    <div className="relative w-7/8 pl-20 leading-tight">
      <img
        className="w-20 h-16 bg-blue bg-blue-gradient left-0 absolute top-1/2 -translate-y-1/2 z-0 p-1"
        src={icon}
        alt={alt}
        width={96}
        height={64}
      />
      <div className="relative z-10 flex flex-col items-center justify-center shadow-md h-20 bg-white py-4 px-12">
        {children}
      </div>
    </div>
  );
}

export default function CovidMeasures() {
  const { t, Translate } = useContext(LanguageContext);

  return (
    <Section section="covid" className="relative z-10 overflow-x-hidden">
      <div className="container py-4 text-center">
        <SectionTitle dark>
          <Translate translationKey="2021.covid.title" />
        </SectionTitle>
        <SectionSubtitle dark>{t("2021.covid.subtitle")}</SectionSubtitle>
        <Warning img={"/images/con/covid.svg"} className="mb-12">
          <Translate
            className="text-white/80 font-semibold"
            translationKey="2021.covid.description_1"
            translationParams={{
              pass_link: (
                <a
                  className="text-blue"
                  href="https://www.gouvernement.fr/info-coronavirus/pass-sanitaire"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("2021.covid.pass_link")}
                </a>
              ),
            }}
          />
          <Translate
            className="text-white/80 font-semibold mt-4"
            translationKey="2021.covid.description_2"
            translationParams={{
              testing_link: (
                <a
                  className="text-blue"
                  href="https://www.sante.fr/cf/centres-depistage-covid.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("2021.covid.testing_link")}
                </a>
              ),
            }}
          />
        </Warning>
        <SectionSubtitle dark>
          {t("2021.covid.other_informations")}
        </SectionSubtitle>
        <div className="grid mx-auto w-full max-w-4xl grid-cols-1 gap-10 | md:grid-cols-2">
          <CovidMeasure icon="/images/con/ventilation.svg" alt="ventilation">
            <Translate translationKey="2021.covid.measures.ventilation" />
          </CovidMeasure>
          <CovidMeasure icon="/images/con/capacities.svg" alt="room capacities">
            <Translate translationKey="2021.covid.measures.capacities" />
          </CovidMeasure>
          <CovidMeasure icon="/images/con/mask2.svg" alt="mandatory masks">
            <Translate translationKey="2021.covid.measures.mask" />
          </CovidMeasure>
          <CovidMeasure icon="/images/con/seats.svg" alt="seats">
            <Translate translationKey="2021.covid.measures.seats" />
          </CovidMeasure>
          <CovidMeasure icon="/images/con/disinfectant.svg" alt="disinfectant">
            <Translate translationKey="2021.covid.measures.disinfectant" />
          </CovidMeasure>
          <CovidMeasure icon="/images/con/mask.svg" alt="mask">
            <Translate translationKey="2021.covid.measures.mask2" />
          </CovidMeasure>
        </div>
        <SectionSubtitle dark className="mt-8">
          {t("2021.covid.update_measures")}
        </SectionSubtitle>
      </div>
    </Section>
  );
}
