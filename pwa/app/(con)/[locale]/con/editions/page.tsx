import { Metadata } from "next";
import Editions from "./components/EditionPage";
import { Locale } from "i18n/i18n-config";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: dictionary.editions.title,
    description: dictionary.editions.description,
  };
}

export default async function EditionPage() {
  return <Editions />;
}
