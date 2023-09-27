"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t, Translate } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2023"
      title={t("2023.review.title")}
      baseline={
        <>
          <p>
            {t("2023.review.subtitle_1")}
            <br />
            {t("2023.review.subtitle_2")}
          </p>
          <Translate
            className="text-sm mt-4"
            translationKey="2023.review.subtitle_3"
            translationParams={{
              link: (
                <a
                  className="font-bold underline"
                  href="https://conference-hall.io/public/event/GMijW4ZrZDo6hzKeF1gk"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("2023.review.link")}
                </a>
              ),
            }}
          />
        </>
      }
    />
  );
}
