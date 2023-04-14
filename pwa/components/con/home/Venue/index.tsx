"use client";
import React, { useContext } from "react";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Section from "components/con/home/Section";
import Warning from "components/con/home/Warning";
import Transport from "./Transport";
import Place from "./Place";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import TransportLine from "./TransportLine";
import { LanguageContext } from "contexts/con/LanguageContext";
import { localeDuration } from "utils/con";

export default function Venue({ subtitle }: { subtitle: string }) {
  const { t, Translate, locale: language } = useContext(LanguageContext);
  return (
    <Section section="venue" className="relative z-20 bg-grey text-center">
      <div className="container">
        <SectionTitle>
          <Translate translationKey="venue.title" />
        </SectionTitle>
        <SectionSubTitle className="mb-4">{subtitle}</SectionSubTitle>
        <Place />
        <Warning title="Tip" img={"/images/con/tip.svg"}>
          <p>{t("venue.tip")}</p>
        </Warning>
        <div className="flex flex-col mt-5 translate-y-7 shadow-md bg-blue-dark | md:flex-row">
          <Transport
            title={t("venue.by_transport", {
              transport: t("venue.transports.train"),
            })}
            icon={"/images/con/train.svg"}
          >
            <TransportLine
              time={localeDuration(30, "minutes", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.brussels"),
              })}
            />
            <TransportLine
              time={localeDuration(50, "minutes", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.paris"),
              })}
            />
            <TransportLine
              time={localeDuration(1.5, "hours", { units: ["h"], language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.london"),
              })}
            />
          </Transport>
          <Transport
            title={t("venue.by_transport", {
              transport: t("venue.transports.car"),
            })}
            icon={"/images/con/car.svg"}
          >
            <TransportLine
              time={localeDuration(2, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.liege"),
              })}
            />
            <TransportLine
              time={localeDuration(2.5, "hours", { units: ["h"], language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.amsterdam"),
              })}
            />
            <TransportLine
              time={localeDuration(3, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.koln"),
              })}
            />
          </Transport>
          <Transport
            title={t("venue.by_transport", {
              transport: t("venue.transports.plane"),
            })}
            icon={"/images/con/plane.svg"}
          >
            <TransportLine
              time={localeDuration(3, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.barcelona"),
              })}
            />
            <TransportLine
              time={localeDuration(4, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.berlin"),
              })}
            />
            <TransportLine
              time={localeDuration(10, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.new-york"),
              })}
            />
          </Transport>
          <Transport
            title={t("venue.by_transport", {
              transport: t("venue.transports.bike"),
            })}
            icon={"/images/con/bike.svg"}
          >
            <TransportLine
              time={localeDuration(16, "hours", { language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.amsterdam"),
              })}
            />
            <TransportLine
              time={localeDuration(92, "hours", { units: ["h"], language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.roma"),
              })}
            />
            <TransportLine
              time={localeDuration(140, "days", { units: ["d"], language })}
              from={t("venue.from_origin", {
                origin: t("venue.origins.beijing"),
              })}
              link="http://www.parispekinavelo.com/itineraire/zoom.htm"
            />
          </Transport>
        </div>
      </div>
    </Section>
  );
}
