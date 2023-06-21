import { getAllConferences } from "api/con/conferences";
import { Conference } from "types/con";
import { Locale, i18n } from "i18n/i18n-config";
import Schedule from "./components/Schedule";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale; edition: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition } = params;
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: dictionary.schedule.title,
    description: dictionary.schedule.description,
    openGraph: {
      title: `${dictionary.schedule.title} - API Platform Conference`,
      description: dictionary.schedule.description,
    },
    twitter: {
      title: `${dictionary.schedule.title} - API Platform Conference`,
      description: dictionary.schedule.description,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/schedule`,
        fr: locale === "fr" ? undefined : `/fr/con/${edition}/schedule`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const extra = (await import(`data/con/${params.edition}/extraConferences`))
    .default;
  const days = (await import(`data/con/${params.edition}/days`)).default;
  const conferences = await getAllConferences(
    params.edition,
    true,
    params.locale
  );

  const allConferences = [...conferences, ...(extra as Conference[])];

  return <Schedule days={days} conferences={allConferences} />;
}

export async function generateStaticParams() {
  return [{ edition: "2021" }, { edition: "2022" }];
}
