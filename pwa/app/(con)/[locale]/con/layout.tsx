import { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { getRootUrl } from "utils";

type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = params.locale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  // fetch data
  const BASE_URL = `${getRootUrl()}/con`;

  return {
    metadataBase: new URL(getRootUrl()),
    title: {
      default: dictionary.title,
      template: "%s - API Platform Conference",
    },
    description: dictionary.description,
    manifest: "/manifest.json",
    themeColor: "#0099a0",
    openGraph: {
      url: BASE_URL,
      title: dictionary.title,
      description: dictionary.description,
      type: "website",
      siteName: "API Platform Conference",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.title,
      description: dictionary.description,
      creator: "@coopTilleuls",
    },
  };
}

const websiteData = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: "API Platform Conference",
  url: "https://api-platform.com/con/",
};

export default function ConLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {children}
    </ClientLayout>
  );
}
