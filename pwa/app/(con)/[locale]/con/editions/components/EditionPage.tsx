"use client";

import React, { useContext } from "react";
import SectionTitle from "components/con/common/typography/SectionTitle";
import { editions, currentEdition } from "data/con/editions";
import EditionCard from "./EditionCard";
import ContactCard from "components/con/layout/ContactCard";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function Editions() {
  const previousEditions = editions.filter(
    (edition) => edition.year !== currentEdition
  );
  const { t, Translate } = useContext(LanguageContext);
  return (
    <>
      <div className="container pt-20 pb-52">
        <div className="speakers__header">
          <SectionTitle h1 dark>
            <Translate translationKey="editions.title" />
          </SectionTitle>
          <SectionSubTitle dark>
            {t("editions.subtitle", { count: previousEditions.length })}
          </SectionSubTitle>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto pb-200 gap-x-6">
          {previousEditions.map((edition) => (
            <EditionCard
              key={edition.year}
              withEditionTitle
              size="big"
              edition={edition}
            />
          ))}
        </div>
      </div>
      <ContactCard />
    </>
  );
}
