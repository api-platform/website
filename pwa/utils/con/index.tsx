import { Conference } from "types/con";
import dayjs from "dayjs";
import humanizeDuration from "./humanize-duration";
import { editions } from "data/con/editions";
import { getRootUrl } from "utils";

export const sortByStartDate: (
  conference1: Conference,
  conference2: Conference
) => 1 | -1 | 0 = (conference1, conference2) => {
  const date1 = conference1.start
    ? dayjs(`${conference1.date}T${conference1.start}`)
    : dayjs();
  const date2 = conference2.start
    ? dayjs(`${conference2.date}T${conference2.start}`)
    : dayjs();
  if (date1.isBefore(date2)) return -1;
  if (date1.isAfter(date2)) return 1;
  return 0;
};

export const toLocaleDate: (date: string) => string = (date) =>
  dayjs(date).format("ll");

export const convertTime: (date: string, time: string) => string = (
  date,
  time
) => dayjs(`${date}T${time}`).format("HH:mm A");

export const isMorningTime: (time?: string) => boolean = (time) =>
  (time && 12 >= parseInt(time.split(":")[0], 10)) || false;

export const getConferenceTimes: (
  date: string,
  start?: string,
  end?: string
) => string = (date, start, end) =>
  start && end
    ? `${convertTime(date, start)} - ${convertTime(date, end)}`
    : toLocaleDate(date);

export const getConferenceDate: (
  date: string,
  start?: string,
  end?: string
) => string = (date, start, end) =>
  start && end
    ? `${toLocaleDate(date)} · ${getConferenceTimes(date, start, end)}`
    : toLocaleDate(date);

export function localeDuration(
  duration: number,
  unit: string,
  params: any = {}
) {
  let ms = duration;
  switch (unit) {
    case "seconds":
      ms = duration * 60;
      break;
    case "minutes":
      ms = duration * 60 * 1000;
      break;
    case "hours":
      ms = duration * 3600 * 1000;
      break;
    case "days":
      ms = duration * 24 * 3600 * 1000;
      break;
    default:
      ms = duration;
  }
  return humanizeDuration(ms, params);
}

export function getEditionEventData(edition: string) {
  const currentEdition = editions.find((e) => e.year === edition);

  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `API Platform Conference ${edition}$`,
    description:
      "The international conference dedicated to API Platform and its ecosystem",
    url: `https://api-platform.com/con/${edition}/`,
    eventStatus: "http://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    startDate: currentEdition?.startDate,
    endDate: currentEdition?.endDate,
    organizer: {
      "@type": "Organization",
      name: "Les-Tilleuls.coop",
      url: "https://les-tilleuls.coop/en",
    },
    location: [
      {
        "@type": "Place",
        name: "Euratechnologies",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lille",
          addressRegion: "Hauts de France",
          postalCode: "59000",
          streetAddress: "Place de Saintignon, 165 avenue de Bretagne",
        },
      },
      {
        "@type": "VirtualLocation",
        url: `https://api-platform.com/con/${edition}/`,
      },
    ],
    image: `${getRootUrl()}/images/con/og-${edition}`,
  };

  return eventData;
}
