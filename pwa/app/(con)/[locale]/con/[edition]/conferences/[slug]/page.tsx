import { Day } from "types/con";
import { getAllConferenceSlugs, getConferenceData } from "api/con/conferences";
import ConferencePage from "./components/ConferencePage";
import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";
import { getRootUrl } from "utils";

type Props = {
  params: { locale: Locale; edition: string; slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { edition, slug } = params;
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);
  const conference = await getConferenceData(
    params.edition,
    params.slug,
    true,
    true,
    params.locale
  );
  let SPEAKERS = "";
  conference.speakers.forEach((speaker, index) => {
    SPEAKERS += speaker.name;
    if (index < conference.speakers.length - 2) SPEAKERS += ", ";
    if (index === conference.speakers.length - 2) SPEAKERS += " & ";
  });
  const DESCRIPTION = dictionary.conference.description
    .replace("%name%", SPEAKERS)
    .replace("%edition%", params.edition);

  const URL = `${getRootUrl()}/${params.locale}/con/${params.edition}/${params.slug}`;

  return {
    title: conference.title,
    description: DESCRIPTION,
    openGraph: {
      title: `${conference.title} - API Platform Conference`,
      description: DESCRIPTION,
      url: URL,
      type: 'website',
      images: [
        {
          url: `${getRootUrl()}/images/con/og-${params.edition}.png`,
          width: 1200,
          height: 630,
          alt: `API Platform Conference ${params.edition}`
        },
      ],
    },
    twitter: {
      title: `${conference.title} - API Platform Conference`,
      description: DESCRIPTION,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/conferences/${slug}`,
        fr:
          locale === "fr"
            ? undefined
            : `/fr/con/${edition}/conferences/${slug}`,
      },
    },
  };
}

export async function generateStaticParams({
  params: { edition, locale },
}: {
  params: { edition: string; locale: Locale };
}) {
  const slugs = await getAllConferenceSlugs(edition);

  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function Page({ params }: Props) {
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
