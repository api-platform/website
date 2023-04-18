import { getSpeakerData, getAllSpeakerSlugs } from "api/con/speakers";
import { getConferencesBySpeaker } from "api/con/conferences";
import SpeakerPage from "./SpeakerPage";
import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";

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

type Props = {
  params: { locale: Locale; edition: string; slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { edition, slug } = params;
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);
  const speaker = await getSpeaker(params.edition, params.slug, params.locale);
  const DESCRIPTION = dictionary.speaker.description
    .replace("%name%", speaker.name)
    .replace("%edition%", params.edition);
  return {
    title: speaker.name,
    description: DESCRIPTION,
    openGraph: {
      title: `${speaker.name} | API Platform Conference ${edition}`,
      description: DESCRIPTION,
    },
    twitter: {
      title: `${speaker.name} | API Platform Conference ${edition}`,
      description: DESCRIPTION,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/speakers/${slug}`,
        fr: locale === "fr" ? undefined : `/fr/con/${edition}/speakers/${slug}`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const speaker = await getSpeaker(params.edition, params.slug, params.locale);
  const conferences = await getConferencesBySpeaker(
    params.edition,
    speaker.id,
    params.locale as Locale
  );

  return <SpeakerPage speakerData={speaker} conferences={conferences} />;
}
