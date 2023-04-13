import { getAllSpeakers } from "api/con/speakers";
import partners from "data/con/2022/partners";
import { Locale } from "i18n/i18n-config";
import HomePage from "./components/HomePage";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const speakers = await getAllSpeakers("2022", params.locale);
  return <HomePage speakers={speakers} partners={partners} />;
}
