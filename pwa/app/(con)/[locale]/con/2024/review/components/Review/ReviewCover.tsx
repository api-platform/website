"use client";
import ReviewCoverBase from "components/con/review/ReviewCover";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ReviewCover() {
  const { t, Translate } = useContext(LanguageContext);
  return (
    <ReviewCoverBase
      edition="2024"
      title={t("2024.review.title")}
      baseline={
        <>
          <p>{t("2024.review.subtitle_1")}</p>
          <Translate
            className="text-sm mt-4"
            translationKey="2024.review.subtitle_2"
            translationParams={{
              link: (
                <a
                  className="font-bold underline"
                  href="https://forms.gle/kNpkFsEZshYnfJST6"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("2024.review.link")}
                </a>
              ),
            }}
          />
        </>
      }
    />
  );
}
