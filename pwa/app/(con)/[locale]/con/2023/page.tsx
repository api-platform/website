import { getAllSpeakers } from "api/con/speakers";
import { getAllEditionPictures } from "api/con/editions";
import partners from "data/con/2022/partners";
import HomePage from "./components/HomePage";
import { Locale } from "i18n/i18n-config";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await import(`i18n/meta/${locale}.json`);

  return {
    title: {
      absolute: dictionary[2023].title,
      template: `%s - API Platform Conference 2023`,
    },
  };
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2023", params.locale);
  const images = (await getAllEditionPictures("2022")).slice(0, 6);

  return <HomePage speakers={speakers} partners={partners} images={images} />;
}
