import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import nav from "data/con/2023/nav";
import footer from "data/con/2023/footer";
import { Metadata } from "next";
import { getEditionEventData } from "utils/con";
import { i18n } from "i18n/i18n-config";
import { getRootUrl } from "utils";

type Props = {
  params: { edition: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = params.locale || i18n.defaultLocale;

  const dictionary = await import(`i18n/meta/${locale}.json`);

  const URL = `${getRootUrl()}/con/2023`;

  return {
    title: {
      default: dictionary[2023].title,
      template: `%s - API Platform Conference 2023`,
    },
    description: dictionary[2023].description,
    openGraph: {
      url: URL,
      title: dictionary[2023].title,
      description: dictionary[2023].description,
    },
    twitter: {
      title: dictionary[2023].title,
      description: dictionary[2023].description,
    },
  };
}

function EditionLayout({ children }: { children: React.ReactNode }) {
  const eventData = getEditionEventData("2023");
  return (
    <LayoutBase edition="2023" nav={nav} footer={footer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
      />
      {children}
      <ContactCard />
    </LayoutBase>
  );
}

export default EditionLayout;
