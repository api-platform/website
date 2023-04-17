import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import type { Metadata } from "next";
import { getEditionEventData } from "utils/con";

type Props = {
  params: { edition: string; locale: string };
};

export async function generateStaticParams() {
  return [{ edition: "2021" }, { edition: "2022" }, { edition: "2023" }];
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { locale, edition } = params;

  // fetch data
  const { URL, OG_IMAGE } = await import(`data/con/${edition}/meta`);

  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      default: dictionary[edition].title,
      template: `%s - API Platform Conference ${edition}`,
    },
    description: dictionary[edition].description,
    openGraph: {
      url: URL,
      title: dictionary[edition].title,
      description: dictionary[edition].description,
      images: OG_IMAGE,
    },
    twitter: {
      title: dictionary[edition].title,
      description: dictionary[edition].description,
      images: OG_IMAGE,
    },
  };
}

async function EditionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    edition: string;
  };
}) {
  const { edition } = params;
  const nav = await import(`data/con/${edition}/nav`);
  const footer = await import(`data/con/${edition}/footer`);

  const eventData = getEditionEventData(edition);

  return (
    <LayoutBase edition={edition} nav={nav.default} footer={footer.default}>
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
