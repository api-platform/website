import "styles/con.css";
import { Poppins, Raleway } from "next/font/google";
import { LanguageProvider } from "contexts/con/LanguageContext";
import { i18n, Locale } from "i18n/i18n-config";
import { getDictionary } from "i18n/get-dictionary";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "500", "800"],
  subsets: ["latin", "latin-ext"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "600", "800"],
  subsets: ["latin", "latin-ext"],
});

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;
export const dynamic = "force-static";

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params,
}: RootLayoutProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <html
      lang={params.locale}
      className={`${poppins.variable} ${raleway.variable}`}
    >
      <body>
        <LanguageProvider locale={params.locale} dictionary={dictionary}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
