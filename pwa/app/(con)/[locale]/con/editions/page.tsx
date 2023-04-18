import { Metadata } from "next";
import Editions from "./components/EditionPage";
import { Locale, i18n } from "i18n/i18n-config";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: dictionary.editions.title,
    description: dictionary.editions.description,
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/editions",
        fr: locale === "fr" ? undefined : "/fr/con/editions",
      },
    },
  };
}

export default async function EditionPage() {
  return <Editions />;
}
