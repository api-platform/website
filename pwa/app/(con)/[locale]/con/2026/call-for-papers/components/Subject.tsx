"use client";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Button from "components/con/common/Button";
import SectionSubTitle from "components/con/common/typography/SectionSubtitle";

export default function Informations() {
  const { t, getLocaleDictionary } = useContext(LanguageContext);
  const categories = getLocaleDictionary?.()[2026].cfp.subject.categories || [];
  return (
    <div className="bg-grey pb-12 relative z-20">
      <div className="container flex flex-col items-center">
        <SectionTitle small lined>
          <strong>{t("2026.cfp.subject.title")}</strong>
        </SectionTitle>
        <SectionSubTitle>{t("2026.cfp.subject.subtitle")}</SectionSubTitle>
        <div className="flex flex-wrap justify-center gap-8 md:gap-3">
          {categories.map((c) => {
            return (
              <div
                key={c.icon}
                className="flex flex-col md:flex-row text-center md:text-left md:odd:translate-x-4 md:even:-translate-x-4 md:odd:rotate-2 md:even:-rotate-1  md:even:flex-row-reverse gap-4 md:gap-12 items-center bg-white w-full max-w-3xl p-8 shadow-floating"
              >
                <div className="rounded-full bg-white size-28 md:size-40 relative flex items-center justify-center">
                  <img
                    src={`/images/con/2026/cfp/${c.icon}.png`}
                    className="rounded-full"
                    alt=""
                  />
                  <div className="size-[110%] absolute max-w-none bg-circle bg-no-repeat left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="flex-1">
                  <p className="font-title text-lg text-blue font-extrabold mb-4 uppercase">
                    {c.title}
                  </p>
                  <div className="text-left flex flex-col gap-2">
                    {c.points.map((p, i) => (
                      <div key={i} className="flex flex-row items-baseline">
                        <span className="text-blue icon-circle-chevron-right mr-2" />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: p,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="mt-12"
          size="large"
          external
          to="https://conference-hall.io/api-platform-conference-2026-lille-and-online"
        >
          {t("2026.cfp.subject.button_subscribe")}
        </Button>
      </div>
    </div>
  );
}
