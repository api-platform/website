"use client";
import React, { useContext } from "react";
import Button from "components/con/common/Button";
import Overline from "components/con/common/typography/Overline";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function LookingSponsorCard() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white shadow-md mx-auto w-full max-w-3xl mt-3 -mb-24 flex flex-col relative z-20 | md:flex-row">
      <h3 className="bg-blue bg-blue-gradient p-7 flex flex-col justify-center">
        <Overline className="text-blue-black">
          {t("sponsorship.looking_sponsor.looking_for")}
        </Overline>
        <span className="text-white font-bold uppercase font-title text-xl lined-center lined-white">
          {t("sponsorship.looking_sponsor.partners")}
        </span>
      </h3>
      <div className="dotted-corner text-left conf__bg-white flex-1 px-10 py-5">
        <h3 className="mb-2 text-blue uppercase font-title font-bold text-2xl">
          {t("sponsorship.looking_sponsor.why_you_should_partner")}
        </h3>
        <ul className="sponsorcard__list mb-30">
          {[1, 2, 3, 4].map((index) => (
            <li key={index} className="flex items-baseline">
              <span className="text-blue icon-circle-chevron-right mr-2" />
              {t(`sponsorship.looking_sponsor.point_${index}`)}
            </li>
          ))}
        </ul>
        <Button
          square
          className="small mt-8"
          to="mailto:events@les-tilleuls.coop"
          external
        >
          {t("become_sponsor")}
        </Button>
      </div>
    </div>
  );
}
