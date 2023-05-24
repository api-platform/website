import { getAllEditionPictures } from "api/con/editions";
import Cover from "./components/Review/ReviewCover";
import ReviewListFr from "./components/Review/fr";
import ReviewListEn from "./components/Review/en";
import Image from "next/image";
import PictureGallery from "components/con/common/PictureGallery";
import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: dictionary.review.title,
    description: dictionary.review.description.replace("%edition%", "2021"),
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2021/review",
        fr: locale === "fr" ? undefined : "/fr/con/2021/review",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const images = await getAllEditionPictures("2021");
  return (
    <>
      <Cover />
      {
        params.locale === "fr" ? (
          <ReviewListFr />
        ) : null /*FIXME: find an other way to translate this page*/
      }
      {
        params.locale === "en" ? (
          <ReviewListEn />
        ) : null /*FIXME: find an other way to translate this page*/
      }
      <PictureGallery
        className="pb-60 pt-12"
        link="https://www.flickr.com/photos/194052559@N02/albums/72157719936921021"
      >
        {images.map((image: string) => (
          <Image
            className="object-cover"
            key={image}
            fill
            src={image}
            alt=""
            sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1536px) 300px, 400px"
          />
        ))}
      </PictureGallery>
    </>
  );
}
