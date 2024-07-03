import { Locale, i18n } from "i18n/i18n-config";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
