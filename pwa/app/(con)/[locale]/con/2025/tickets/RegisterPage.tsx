"use client";
import { useContext, useEffect } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";
import Script from "next/script";
import prices from "data/con/2025/prices";
import { Offer } from "types/con";
import dayjs from "dayjs";
import classNames from "classnames";
import { toLocaleDate } from "utils/con";

export default function RegisterPage() {
  const { t, Translate, locale, getLocaleDictionary } =
    useContext(LanguageContext);
  const timelinePrices = prices
    .find((p) => p.id === 1)
    ?.offers.filter((o) => o.type);

  const isActiveOffer = (offer: Offer) => {
    if (offer.limitDate && dayjs(offer.limitDate).isBefore(dayjs(), "day"))
      return false;
    if (offer.startDate && dayjs(offer.startDate).isAfter(dayjs(), "day"))
      return false;
    return true;
  };

  const isPastOffer = (offer: Offer) => {
    if (isActiveOffer(offer)) return false;
    if (offer.startDate && dayjs(offer.startDate).isBefore(dayjs(), "day"))
      return true;
    if (!offer.startDate) return true;
    return false;
  };

  const expectations =
    getLocaleDictionary?.()[2025].tickets.expect.points || [];

  useEffect(() => {
    const iframe = document.getElementById(
      "yurplan-widget-141690"
    ) as HTMLIFrameElement | null;
    if (!iframe) return;
    const handleLoad = () => {
      const loader = document.getElementById("loader");
      loader?.classList.add("hidden");
    };
    iframe.addEventListener("load", handleLoad, true);
  }, []);

  return (
    <>
      <div className="container max-w-5xl flex flex-col items-center py-12 relative z-10">
        <SectionTitle small h1 dark lined>
          <Translate translationKey="2025.tickets.title" />
        </SectionTitle>
        <SectionSubTitle dark>{t("2025.tickets.subtitle")}</SectionSubTitle>
      </div>
      <div className="after:h-1/3 after:absolute after:w-full after:bg-grey after:bottom-0 after:left-0 relative">
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center lg:items-start">
            <div className="translate-y-12 relative z-10 w-4/5 lg:w-2/5 max-w-md before:absolute before:w-full before:h-full before:bg-blue before:-translate-x-3 before:-translate-y-3 before:left-0 before:top-0">
              <img
                className="relative"
                src="/images/con/2024/review/pic-06.jpg"
              />
            </div>
            <div className="flex-1 relative bg-white shadow-floating dotted-corner p-12 pt-24 lg:pt-12 lg:pl-24 lg:-translate-x-12 leading-relaxed font-light">
              <Translate translationKey="2025.tickets.description" />
              <p className="mt-4 text-lg font-bold">
                {t("2025.tickets.description2")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-grey py-12">
        <div className="container max-w-6xl">
          <SectionTitle small lined>
            <Translate translationKey="2025.tickets.expect.title" />
          </SectionTitle>
          <div className="mx-auto max-w-64 sm:max-w-xl grid grid-cols-1 sm:grid-cols-2 xl:max-w-none xl:grid-cols-4 gap-8 text-white">
            {expectations.map((e, i) => (
              <div
                key={i}
                className={classNames(
                  "p-8 aspect-square flex flex-col justify-center",
                  i === 0 && "bg-blue-dark",
                  i === 1 && "bg-blue-black/80",
                  i === 2 && "bg-blue-darkest",
                  i === 3 && "bg-blue-dark"
                )}
              >
                <p className="uppercase font-bold text-xl">{e.title}</p>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container max-w-4xl py-12">
          <SectionTitle small lined>
            <strong>{t("2025.tickets.buy")}</strong>
          </SectionTitle>
          <div className="hidden relative w-full gap-0 md:grid grid-cols-3 py-12 overflow-hidden">
            <div className="absolute w-1.5 h-full left-4 -translate-x-1/2 md:-translate-x-0 top-0 md:h-1.5 md:w-full md:top-1/2 md:left-0 md:-translate-y-1/2 bg-blue-black/30"></div>
            {timelinePrices?.map((p) => (
              <div
                key={p.type}
                className="relative flex flex-col items-center gap-2"
              >
                <div className="ml-8 md:ml-0 whitespace-nowrap absolute left-full md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                  <div
                    className={classNames(
                      "font-bold uppercase md:mb-12 text-left md:text-center",
                      isActiveOffer(p)
                        ? "text-blue"
                        : isPastOffer(p)
                        ? "text-blue-black/30"
                        : "text-blue-black"
                    )}
                  >
                    {p.type}
                  </div>
                  <p
                    className={classNames(
                      isPastOffer(p)
                        ? "text-blue-black/30"
                        : "text-blue-black/70"
                    )}
                  >
                    {t("2025.tickets.until_date", {
                      date: toLocaleDate(p.limitDate as string),
                    })}
                  </p>
                </div>
                <div
                  className={classNames(
                    "relative rounded-full border-4 size-8",
                    isActiveOffer(p)
                      ? "border-blue bg-blue before:h-screen before:w-1.5 before:md:w-screen before:absolute before:md:h-1.5 before:bottom-full before:-translate-x-1/2 before:md:-translate-x-0 before:md:right-full before:bg-blue before:left-1/2 before:md:left-auto before:md:top-1/2 before:md:-translate-y-1/2"
                      : isPastOffer(p)
                      ? "border-blue bg-white z-10"
                      : "border-blue-black/30 bg-white"
                  )}
                />
              </div>
            ))}
          </div>
          <svg
            id="loader"
            className="loader animate-spin mx-auto mt-8 size-10 text-blue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <div className="yurplan-widget-container max-w-5xl container pb-20 md:pt-12">
            <iframe
              title="yurplan"
              src={`https://yurplan.com/events/API-Platform-Conference-2025/138927/tickets/widget?widget=dGlja2V0aW5nV2lkZ2V0WXBfMTM2ODk5XzE0MTY5MA%3D%3D&from=widget_141690&wversion=1&culture=${locale}`}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              loading="eager"
              className="yurplan-widget"
              style={{ height: "auto" }}
              id="yurplan-widget-141690"
              data-id="141690"
            ></iframe>
          </div>
          <Script
            type="text/javascript"
            src="https://assets.yurplan.com/yurplan-v1/dist/widget.js"
          />
        </div>
      </div>
    </>
  );
}
