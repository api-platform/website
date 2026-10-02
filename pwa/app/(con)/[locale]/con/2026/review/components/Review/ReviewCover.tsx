"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t, Translate } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2026"
      title={t("2026.review.title")}
      baseline={
        <>
          <p>{t("2026.review.subtitle_1")}</p>
          <Translate
            className="text-sm mt-4"
            translationKey="2026.review.subtitle_2"
          />
        </>
      }
    />
  );
}
