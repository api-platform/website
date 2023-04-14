import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import nav from "data/con/2023/nav";
import footer from "data/con/2023/footer";
import { OG_IMAGE, URL } from "data/con/2023/meta";
import { Metadata } from "next";

type Props = {
  params: { edition: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { locale } = params;

  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      default: dictionary[2023].title,
      template: `%s - API Platform Conference 2021`,
    },
    description: dictionary[2023].description,
    openGraph: {
      url: URL,
      title: dictionary[2023].title,
      description: dictionary[2023].description,
      images: OG_IMAGE,
    },
    twitter: {
      title: dictionary[2023].title,
      description: dictionary[2023].description,
      images: OG_IMAGE,
    },
  };
}

function EditionLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutBase edition="2023" nav={nav} footer={footer}>
      {children}
      <ContactCard />
    </LayoutBase>
  );
}

export default EditionLayout;
