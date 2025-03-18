import { getAllSpeakers } from "api/con/speakers";
import { Locale } from "i18n/i18n-config";
import SpeakersPage from "./SpeakersPage";

const getSpeakers = async (edition: string, locale: Locale) => {
  const speakers = await getAllSpeakers(edition, locale);
  return speakers;
};

type Props = {
  params: { locale: Locale; edition: string };
};

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
