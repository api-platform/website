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

  return {
    title: dictionary.speakers.title,
    description: dictionary.speakers.description,
    openGraph: {
      title: `API Platform Conference ${edition} | ${dictionary.speakers.title}`,
      description: dictionary.speakers.description,
    },
    twitter: {
      title: `API Platform Conference ${edition} | ${dictionary.speakers.title}`,
      description: dictionary.speakers.description,
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
  return [{ edition: "2021" }, { edition: "2022" }];
};

export const dynamicParams = false;
