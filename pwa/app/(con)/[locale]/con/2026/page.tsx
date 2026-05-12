import { getAllSpeakers } from "api/con/speakers";
import partners from "data/con/2026/partners";
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
      absolute: dictionary[2026].title,
      template: `%s - API Platform Conference 2026`,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2026",
        fr: locale === "fr" ? undefined : "/fr/con/2026",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2026", params.locale);

  return <HomePage speakers={speakers} partners={partners} />;
}
