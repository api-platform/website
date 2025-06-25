import { getAllConferences } from "api/con/conferences";
import { Conference, Track } from "types/con";
import { Locale } from "i18n/i18n-config";
import Schedule from "./components/Schedule";

type Props = {
  params: { locale: Locale; edition: string };
};

export default async function Page({ params }: Props) {
  const days = (await import(`data/con/${params.edition}/days`)).default;
  const tracks = (await import(`data/con/${params.edition}/tracks`)).default;
  const extra = (
    await import(`data/con/${params.edition}/extraConferences`)
  ).default.map((c: any) => ({
    ...c,
    track: c.track && tracks.find((t: Track) => t.id === c.track),
  }));
  const conferences = await getAllConferences(
    params.edition,
    true,
    params.locale
  );

  const allConferences = [...conferences, ...(extra as Conference[])];

  return <Schedule days={days} conferences={allConferences} tracks={tracks} />;
}

export async function generateStaticParams() {
  return [
    { edition: "2021" },
    { edition: "2022" },
    { edition: "2023" },
    { edition: "2024" },
    { edition: "2025" },
  ];
}
