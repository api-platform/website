import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";
import RegisterPage from "./RegisterPage";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary.tickets.title,
      template: `%s - API Platform Conference 2026`,
    },
    description: dictionary.tickets.description,
    openGraph: {
      title: `${dictionary.tickets.title} - API Platform Conference`,
      description: dictionary.tickets.description,
    },
    twitter: {
      title: `${dictionary.tickets.title} - API Platform Conference`,
      description: dictionary.tickets.description,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con/2026/tickets",
        fr: locale === "fr" ? undefined : "/fr/con/2026/tickets",
      },
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  return <RegisterPage />;
}
