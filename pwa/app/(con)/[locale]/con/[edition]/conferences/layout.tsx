import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";
import { getRootUrl } from "utils";

type Props = {
  params: { locale: Locale; edition: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition } = params;
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  const DESCRIPTION = dictionary.conferences.description.replace(
    "%edition%",
    edition
  );

  return {
    title: dictionary.conferences.title,
    description: DESCRIPTION,
    openGraph: {
      title: `${dictionary.conferences.title} - API Platform Conference`,
      description: DESCRIPTION,
      images: [
        {
          url: `${getRootUrl()}/images/con/og-${edition}.png`,
          width: 1200,
          height: 630,
          alt: `API Platform Conference ${edition}`,
        },
      ],
    },
    twitter: {
      title: `${dictionary.conferences.title} - API Platform Conference`,
      description: DESCRIPTION,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/conferences`,
        fr: locale === "fr" ? undefined : `/fr/con/${edition}/conferences`,
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
