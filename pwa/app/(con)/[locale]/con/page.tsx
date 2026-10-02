import { getAllEditionPictures } from "api/con/editions";
import LayoutBase from "components/con/layout/LayoutBase";
import editions, { currentEdition } from "data/con/editions";
import { Locale, i18n } from "i18n/i18n-config";
import { Metadata } from "next";
import HomePage from "./components/HomePage";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary.title,
    },
    alternates: {
      languages: {
        en: locale === "en" ? undefined : "/con",
        fr: locale === "fr" ? undefined : "/fr/con",
      },
    },
  };
}

const nav = {
  logoLink: "/",
  links: [
    {
      to: "/{{locale}}/con/editions",
      text: "nav.links.previous_editions",
    },
    {
      to: "/{{locale}}/con/2026/review",
      text: "con_home.review",
    },
    {
      to: "/{{locale}}/con/2026",
      text: "Archive 2026",
    },
  ],
};

export default async function Page({ params }: Props) {
  const { locale } = params;
  const images = await getAllEditionPictures("2026");

  const footer = [
    {
      title: "Previous editions",
      links: editions
        .filter((edition) => edition.year !== currentEdition)
        .map((edition) => ({
          title: `${edition.year} edition`,
          link: `/${locale}/con/${edition.year}`,
        })),
    },
  ];

  return (
    <LayoutBase nav={nav} footer={footer}>
      <HomePage images={images} />
    </LayoutBase>
  );
}
