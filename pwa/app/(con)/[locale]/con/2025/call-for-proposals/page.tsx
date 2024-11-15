import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";
import Package from "./components/Package";
import Informations from "./components/Informations";
import Subject from "./components/Subject";
import Technos from "./components/Techno";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary[2025].title,
      template: `%s - API Platform Conference 2025`,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2025",
        fr: locale === "fr" ? undefined : "/fr/con/2024",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  return (
    <div>
      <Informations />
      <Subject />
      <Package />
      <Technos />
    </div>
  );
}
