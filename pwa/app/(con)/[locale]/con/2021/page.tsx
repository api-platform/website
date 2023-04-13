import { getAllSpeakers } from "api/con/speakers";
import partners from "data/con/2021/partners";
import { Locale } from "i18n/i18n-config";
import HomePage from "./components/HomePage";

export default async function Pag({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2021", params.locale);
  return <HomePage speakers={speakers} partners={partners} />;
}
