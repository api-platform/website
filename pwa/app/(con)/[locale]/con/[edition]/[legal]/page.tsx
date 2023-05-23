import { getAllLegalSlugs, getLegalData } from "api/con/legal";
import LegalPage from "./LegalPage";
import { Metadata } from "next";
import { Locale, i18n } from "i18n/i18n-config";

type Props = {
  params: { locale: Locale; legal: string; edition: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal, edition } = params;
  const locale = params.locale || i18n.defaultLocale;
  const legalData = await getLegalData(edition, legal, locale);

  return {
    title: legalData.title,
    openGraph: {
      title: `API Platform Conference ${edition} | ${legalData.title}`,
    },
    twitter: {
      title: `API Platform Conference ${edition} | ${legalData.title}`,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : `/con/${edition}/${legal}`,
        fr: locale === "fr" ? undefined : `/fr/con/${edition}/${legal}`,
      },
    },
  };
}

export async function generateStaticParams({ params: { edition } }: Props) {
  const slugs = await getAllLegalSlugs(edition);

  return slugs.map((legal: string) => ({
    legal,
  }));
}

export default async function Page({
  params,
}: {
  params: {
    edition: string;
    legal: string;
    locale: Locale;
  };
}) {
  const legalData = await getLegalData(
    params.edition,
    params.legal,
    params.locale
  );

  return <LegalPage title={legalData.title} content={legalData.content} />;
}
