"use client";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";

export default function Package() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="container max-w-6xl text-center">
      <SectionTitle small dark lined>
        <strong>{t("2026.cfp.package.title")}</strong>
      </SectionTitle>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-0 text-left">
        <div className="translate-y-12 relative z-10 w-4/5 lg:w-1/2 max-w-md before:absolute before:w-full before:h-full before:bg-blue before:-translate-x-3 before:-translate-y-3 before:left-0 before:top-0">
          <img
            src="/images/con/2026/cfp/speaker-gift.jpg"
            className="relative w-full"
            alt=""
          />
        </div>
        <div className="bg-white max-w-xl p-8 flex-1 pt-20 lg:pt-8 lg:pl-20 -translate-y-12 lg:-translate-y-0 lg:-translate-x-12">
          <div className="font-bold text-blue leading-tight font-title text-xl uppercase lined-left lined-blue relative">
            {t("2026.cfp.package.subtitle")}
          </div>
          <ul className="mb-30 text-left flex flex-col gap-3 mt-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <li key={index} className="flex items-baseline">
                <span className="text-blue icon-circle-chevron-right mr-2" />
                {t(`2026.cfp.package.point_${index}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
