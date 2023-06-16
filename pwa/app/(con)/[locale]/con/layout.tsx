import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const locale = params.locale;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  // fetch data
  const { URL: BASE_URL, OG_IMAGE } = await import(`data/con/meta`);

  return {
    metadataBase: new URL(
      "https://" + process.env.NEXT_ROOT_URL || "https://api-platform.com"
    ),
    title: {
      default: dictionary.title,
      template: "%s - API Platform Conference",
    },
    description: dictionary.description,
    manifest: "/manifest.json",
    themeColor: "#0099a0",
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      url: BASE_URL,
      title: dictionary.title,
      description: dictionary.description,
      type: "website",
      siteName: "API Platform Conference",
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.title,
      description: dictionary.description,
      images: OG_IMAGE,
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
