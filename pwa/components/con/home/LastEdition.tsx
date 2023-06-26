"use client";
import React, { useContext } from "react";
import Link from "components/common/Link";
import Image from "next/image";
import PictureGallery from "components/con/common/PictureGallery";
import Section from "components/con/home/Section";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function LastEdition({
  edition,
  link,
}: {
  edition: string;
  link: string;
}) {
  const { t, Translate } = useContext(LanguageContext);

  return (
    <Section
      className="bg-white overflow-hidden relative pb-10"
      section="lastyear"
    >
      <div className="container">
        <SectionTitle>
          <Translate translationKey="last_edition.title" />
        </SectionTitle>
        <SectionSubTitle>
          {t("last_edition.subtitle", { edition }).replace(
            "%review%",
            <Link
              prefetch={false}
              href={`/con/${edition}/review`}
              className="link"
            >
              {t("last_edition.our_review")}
            </Link>
          )}
        </SectionSubTitle>
      </div>
      <PictureGallery link={link}>
        {[...Array(6)].map((x, i) => (
          <Image
            fill
            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1536px) 300px, 400px"
            alt=""
            key={`pic${i}`}
            src={`/images/con/${edition}/pic-0${i + 1}.jpg`}
          />
        ))}
      </PictureGallery>
    </Section>
  );
}
