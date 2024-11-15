"use client";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Button from "components/con/common/Button";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    className="stroke-blue size-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default function Informations() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="after:h-1/3 after:absolute after:w-full after:bg-grey after:bottom-0 after:left-0 relative">
      <div className="container flex flex-col items-center py-12 relative z-10">
        <SectionTitle h1 dark lined>
          <strong>{t("2025.cfp.title")}</strong>
        </SectionTitle>
        <SectionSubTitle dark>{t("2025.cfp.subtitle")}</SectionSubTitle>
        <div className="bg-white border-t-8 border-t-blue shadow-xl text-center p-8 dotted-corner corner-bottom mx-auto w-full max-w-4xl flex flex-col gap-8 items-center">
          <span className="font-bold text-blue leading-tight font-title text-xl uppercase lined-center lined-blue relative">
            {t("2025.cfp.informations")}
          </span>
          <ul className="flex flex-col gap-8 text-left text-lg">
            {[1, 2, 3, 4, 5].map((index) => (
              <li key={index} className="flex flex-row gap-2">
                <Arrow />
                <p className="flex-1">{t(`2025.cfp.point_${index}`)}</p>
              </li>
            ))}
          </ul>
          <Button
            size="large"
            external
            to="https://forms.gle/kNpkFsEZshYnfJST6"
          >
            {t("2025.cfp.button_subscribe")}
          </Button>
        </div>
      </div>
    </div>
  );
}
