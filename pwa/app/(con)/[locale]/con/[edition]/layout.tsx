import React from "react";
import LayoutBase from "components/con/layout/LayoutBase";
import ContactCard from "components/con/layout/ContactCard";
import type { Metadata } from "next";
import { getEditionEventData } from "utils/con";
import { i18n } from "i18n/i18n-config";
import { getRootUrl } from "utils";

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
  const { edition } = params;
  const locale = params.locale || i18n.defaultLocale;

  // fetch data
  const URL = `${getRootUrl()}/con/${edition}`;

  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      default: dictionary[edition].title,
      template: `%s - API Platform Conference ${edition}`,
    },
    description: dictionary[edition].description,
    openGraph: {
      url: URL,
      title: `${dictionary[edition].title} - API Platform Conference`,
      description: dictionary[edition].description,
      type: "website",
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
      title: `${dictionary[edition].title} - API Platform Conference`,
      description: dictionary[edition].description,
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
