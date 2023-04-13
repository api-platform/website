import { getAllConferences } from "api/con/conferences";
import { Conference } from "types/con";
import { Locale } from "i18n/i18n-config";
import Schedule from "./components/Schedule";

export default async function Page({
  params,
}: {
  params: {
    edition: string;
    locale: Locale;
  };
}) {
  const extra = (await import(`data/con/${params.edition}/extraConferences`))
    .default;
  const days = (await import(`data/con/${params.edition}/days`)).default;
  const conferences = await getAllConferences(
    params.edition,
    true,
    params.locale
  );

  const allConferences = [...conferences, ...(extra as Conference[])];

  return <Schedule days={days} conferences={allConferences} />;
}

export async function generateStaticParams() {
  return [{ edition: "2021" }, { edition: "2022" }];
}
