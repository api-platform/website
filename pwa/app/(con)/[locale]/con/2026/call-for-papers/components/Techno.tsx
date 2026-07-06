"use client";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";
import { Logos } from "./logos";

export default function Technos() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="container pt-12 flex flex-col items-center pb-44">
      <SectionTitle small dark lined>
        <strong>{t("2026.cfp.techno.title")}</strong>
      </SectionTitle>
      <div className="relative w-full h-16 my-4">
        <div className="absolute max-w-none w-max left-0 top-0 flex gap-4 flex-row h-20 animate-defile">
          <Logos />
          <Logos />
          <Logos />
        </div>
      </div>
    </div>
  );
}
