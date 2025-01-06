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
      absolute: dictionary["call-for-papers"].title,
      template: `%s - API Platform Conference 2025`,
    },
    description: dictionary["call-for-papers"].description,
    openGraph: {
      title: `${dictionary["call-for-papers"].title} - API Platform Conference`,
      description: dictionary["call-for-papers"].description,
    },
    twitter: {
      title: `${dictionary["call-for-papers"].title} - API Platform Conference`,
      description: dictionary["call-for-papers"].description,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2025/call-for-papers",
        fr: locale === "fr" ? undefined : "/fr/con/2025/call-for-papers",
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
