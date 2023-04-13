import { getAllSpeakers } from "api/con/speakers";
import { Locale } from "i18n/i18n-config";
import SpeakersPage from "./SpeakersPage";

const getSpeakers = async (edition: string, locale: Locale) => {
  const speakers = await getAllSpeakers(edition, locale);
  return speakers;
};

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
