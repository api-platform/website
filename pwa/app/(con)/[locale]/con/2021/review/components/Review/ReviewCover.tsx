"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import Button from "components/con/common/Button";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2021"
      title={t("2021.review.title")}
      baseline={
        <p>
          {t("2021.review.subtitle_1")}
          <br />
          {t("2021.review.subtitle_2")}
        </p>
      }
      button={
        <Button to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4">
          {t("2021.review.watch_conferences")}
        </Button>
      }
    />
  );
}
