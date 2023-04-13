import { Day } from "types/con";
import { getAllConferenceSlugs, getConferenceData } from "api/con/conferences";
import ConferencePage from "./components/ConferencePage";
import { Locale } from "i18n/i18n-config";

export async function generateStaticParams({
  params: { edition, locale },
}: {
  params: { edition: string; locale: Locale };
}) {
  const slugs = await getAllConferenceSlugs(edition, locale);

  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function Page({
  params,
}: {
  params: {
    edition: string;
    slug: string;
    locale: Locale;
  };
}) {
  const conference = await getConferenceData(
    params.edition,
    params.slug,
    true,
    true,
    params.locale
  );
  const days = (await import(`data/con/${params.edition}/days`)).default;
  return (
    <ConferencePage
      conference={conference}
      day={days.find((day: Day) => day.date === conference.date)}
    />
  );
}
