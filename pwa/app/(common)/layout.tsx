import "styles/common.css";
import { Poppins } from "next/font/google";
import Layout from "components/layout/Layout";
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  const BASE_URL =
    "https://" + process.env.NEXT_ROOT_URL || "https://api-platform.com";
  const URL_LOGO = `${BASE_URL}/images/logo.png`;

  const title = dictionary["layout"].title;
  const description = dictionary["layout"].description;

  return {
    metadataBase: new URL(BASE_URL),
    title: title,
    description: description,
    keywords: ["API Platform", "REST", "PHP", "Javascript"],
    authors: [
      { name: "Kévin Dunglas", url: "https://dunglas.fr" },
      { name: "Antoine Bluchet", url: "https://soyuka.me" },
    ],
    colorScheme: "dark",
    creator: "Kévin Dunglas",
    themeColor: "#0099a1",
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      url: "https://api-platform.com",
      title: title,
      description: description,
      type: "website",
      siteName: "API Platform",
      images: URL_LOGO,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: URL_LOGO,
      creator: "@dunglas",
    },
  };
}

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} w-full light`}>
      <body className="bg-white dark:bg-blue-black">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export default RootLayout;
