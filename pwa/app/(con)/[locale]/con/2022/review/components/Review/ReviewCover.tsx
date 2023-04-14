"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t, Translate } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2022"
      title={t("2022.review.title")}
      baseline={
        <>
          <p>
            {t("2022.review.subtitle_1")}
            <br />
            {t("2022.review.subtitle_2")}
          </p>
          <Translate
            className="text-sm mt-4"
            translationKey="2022.review.subtitle_3"
            translationParams={{
              twitter: (
                <a
                  className="font-bold underline"
                  href="https://twitter.com/ApiPlatform"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Twitter
                </a>
              ),
            }}
          />
        </>
      }
    />
  );
}
