"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t, Translate, locale } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2025"
      title={t("2025.review.title")}
      baseline={
        <>
          <p>{t("2025.review.subtitle_1")}</p>
          <Translate
            className="text-sm mt-4"
            translationKey="2025.review.subtitle_2"
            translationParams={{
              link: (
                <a
                  className="font-bold underline"
                  href="https://conference-hall.io/api-platform-conference-2025-lille-and-online"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("2025.review.link")}
                </a>
              ),
              link2: (
                <a
                  className="font-bold underline"
                  href={`/${locale}/con/2025/tickets`}
                >
                  {t("2025.review.link2")}
                </a>
              ),
            }}
          />
        </>
      }
    />
  );
}
