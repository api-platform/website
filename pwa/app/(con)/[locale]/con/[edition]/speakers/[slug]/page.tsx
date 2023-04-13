import { getSpeakerData, getAllSpeakerSlugs } from "api/con/speakers";
import { getConferencesBySpeaker } from "api/con/conferences";
import SpeakerPage from "./SpeakerPage";
import { Locale } from "i18n/i18n-config";

async function getSpeaker(slug: string, edition: string, locale: string) {
  const speaker = await getSpeakerData(slug, edition, locale);
  return speaker;
}
export async function generateStaticParams({
  params: { edition, locale },
}: {
  params: { edition: string; locale: string };
}) {
  const slugs = await getAllSpeakerSlugs(edition, locale);

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
    locale: string;
  };
}) {
  const speaker = await getSpeaker(params.edition, params.slug, params.locale);
  const conferences = await getConferencesBySpeaker(
    params.edition,
    speaker.id,
    params.locale as Locale
  );

  return <SpeakerPage speakerData={speaker} conferences={conferences} />;
}
