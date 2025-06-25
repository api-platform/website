import { Locale } from "i18n/i18n-config";
import ConferencesPage from "./ConferencesPage";
import { getAllConferenceSlugs, getConferenceData } from "api/con/conferences";
import { getConferenceDate, sortByStartDate } from "utils/con";

const getConferences = async (edition: string, locale: Locale) => {
  const conferencesSlugs = await getAllConferenceSlugs(edition);
  const conferences = Promise.all(
    conferencesSlugs.map(async (s) => {
      const data = await getConferenceData(edition, s, true, true, locale);
      return data;
    })
  );
  return conferences;
};

type Props = {
  params: { locale: Locale; edition: string };
};

export default async function Page({ params }: Props) {
  const conferences = await getConferences(params.edition, params.locale);
  const sortedConferences = conferences.sort(sortByStartDate);
  const days = (await import(`data/con/${params.edition}/days`)).default;
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return <ConferencesPage days={days} conferences={sortedConferences} edition={params.edition} />;
}

export const generateStaticParams = async () => {
  return [
    { edition: "2021" },
    { edition: "2022" },
    { edition: "2023" },
    { edition: "2024" },
    { edition: "2025" },
  ];
};

export const dynamicParams = false;
