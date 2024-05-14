import { getAllSpeakers } from "api/con/speakers";
import { Locale, i18n } from "i18n/i18n-config";
import SpeakersPage from "./SpeakersPage";
import { Metadata } from "next";

const getSpeakers = async (edition: string, locale: Locale) => {
  const speakers = await getAllSpeakers(edition, locale);
  return speakers;
};

type Props = {
  params: { locale: Locale; edition: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition } = params;
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  const DESCRIPTION = dictionary.speakers.description.replace(
    "%edition%",
    edition
  );

  return {
    title: dictionary.speakers.title,
    description: DESCRIPTION,
    openGraph: {
      title: `${dictionary.speakers.title} - API Platform Conference`,
      description: DESCRIPTION,
    },
    twitter: {
      title: `${dictionary.speakers.title} - API Platform Conference`,
      description: DESCRIPTION,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/speakers`,
        fr: locale === "fr" ? undefined : `/fr/con/${edition}/speakers`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const speakers = await getSpeakers(params.edition, params.locale);
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <SpeakersPage speakers={speakers} />;
}

export const generateStaticParams = async () => {
  return [
    { edition: "2021" },
    { edition: "2022" },
    { edition: "2023" },
    { edition: "2024" },
  ];
};

export const dynamicParams = false;
