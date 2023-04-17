import { getAllSpeakers } from "api/con/speakers";
import partners from "data/con/2022/partners";
import { Locale } from "i18n/i18n-config";
import HomePage from "./components/HomePage";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary[2022].title,
      template: `%s - API Platform Conference 2022`,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2022",
        fr: locale === "fr" ? undefined : "/fr/con/2022",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2022", params.locale);

  return <HomePage speakers={speakers} partners={partners} />;
}
