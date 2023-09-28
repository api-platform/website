import { getAllSpeakers } from "api/con/speakers";
import { getAllEditionPictures } from "api/con/editions";
import partners from "data/con/2023/partners";
import HomePage from "./components/HomePage";
import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary[2024].title,
      template: `%s - API Platform Conference 2024`,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2024",
        fr: locale === "fr" ? undefined : "/fr/con/2024",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2024", params.locale);
  const images = (await getAllEditionPictures("2023")).slice(0, 6);

  return <HomePage speakers={speakers} partners={partners} images={images} />;
}
