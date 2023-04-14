import { getAllSpeakers } from "api/con/speakers";
import { Locale } from "i18n/i18n-config";
import SpeakersPage from "./SpeakersPage";
import { Metadata } from "next";

const getSpeakers = async (edition: string, locale: Locale) => {
  const speakers = await getAllSpeakers(edition, locale);
  return speakers;
};

type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = params.locale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: dictionary.speakers.title,
    description: dictionary.speakers.description,
    openGraph: {
      title: dictionary.title,
      description: dictionary.description,
    },
    twitter: {
      title: dictionary.title,
      description: dictionary.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: {
    edition: string;
    locale: Locale;
  };
}) {
  const speakers = await getSpeakers(params.edition, params.locale);
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <SpeakersPage speakers={speakers} />;
}

export const generateStaticParams = async () => {
  return [{ edition: "2021" }, { edition: "2022" }];
};

export const dynamicParams = false;
