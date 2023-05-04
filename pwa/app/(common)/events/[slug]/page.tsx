import { getEventContent } from "api/events";
import Heading from "components/common/typography/Heading";
import { Calendar, Video } from "components/icons";
import Image from "next/image";
import Button from "components/common/Button";
import dayjs from "dayjs";
import EventInfosCard from "./components/EventInfosCard";
import EventResumeInfos from "../components/EventResumeInfos";
import Chip from "components/common/Chip";
import ShapeSection from "components/common/ShapeSection";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { title } = await getEventContent(slug);
  const dictionary = await import(`data/meta.json`);

  const t = dictionary["event"].title.replace("%title%", title);
  const description = dictionary["event"].description;

  return {
    title: t,
    description,
    openGraph: {
      title: t,
      description,
    },
    twitter: {
      title: t,
      description,
    },
  };
}

export async function generateStaticParams() {
  return [];
}

function convertEventDateToString({
  date,
  time,
}: {
  date: string;
  time?: string;
}) {
  return `${date.replaceAll("-", "")}T${
    time ? time.replaceAll(":", "").padEnd(6, "0") : "000000"
  }`;
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const { Mdx, ...event } = await getEventContent(slug);
  const { title, cover, startDate, type, subscriptionLink, video } = event;

  const googleCalendarLink = `http://www.google.com/calendar/event?action=TEMPLATE&dates=${convertEventDateToString(
    event.startDate
  )}${
    event.endDate ? `/${convertEventDateToString(event.endDate)}` : ""
  }&text=${encodeURI(event.title)}`;

  const components = {
    h1: () => null,
    p: (
      props: Omit<React.HTMLAttributes<HTMLParagraphElement>, "className">
    ) => <p className="mb-8">{props.children}</p>,
  };
  return (
    <>
      <ShapeSection
        className="bg-blue pb-4 text-white dark:text-blue-black"
        effect="right-triangle"
        maskColor="gray-100"
        darkModeColor="blue-black"
      >
        {cover && (
          <Image
            alt=""
            src={cover}
            width="1200"
            height="500"
            className="w-[150vw] h-full object-cover absolute brightness-[0.5] opacity-[15%] left-1/2 -translate-x-1/2"
          />
        )}
        <div className="container xl:max-w-6xl pt-48 text-center relative flex flex-col lg:flex-row lg:items-end lg:justify-start lg:min-h-[450px] ">
          <div className="text-center lg:text-left lg:pb-12 lg:w-2/3">
            <Chip empty text={type} className="mb-3" />
            <Heading size="xl" level="h1">
              <strong>{title}</strong>
            </Heading>
            <div className="hidden text-sm mt-2 lg:flex">
              <EventResumeInfos
                city={event.venue.city}
                startDate={event.startDate.date}
                endDate={event.endDate?.date}
              />
            </div>
            <div className="flex flex-col mt-6 gap-4 mx-auto w-max | sm:justify-center sm:w-auto sm:flex-row sm:gap-2 | lg:justify-start">
              {subscriptionLink && dayjs(startDate.date).isAfter(dayjs()) ? (
                <Button
                  size="small"
                  color="white"
                  className="h-8"
                  href={subscriptionLink}
                >
                  Register
                </Button>
              ) : null}
              {dayjs(startDate.date).isAfter(dayjs()) ? (
                <Button
                  empty
                  external
                  color="white"
                  size="small"
                  href={googleCalendarLink}
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  <span>Add to calendar</span>
                </Button>
              ) : null}
              {video ? (
                <Button external color="white" size="small" href={video}>
                  <Video className="w-6 h-6 mr-2" />
                  <span>Watch replay</span>
                </Button>
              ) : null}
            </div>
          </div>
          <EventInfosCard event={event} />
        </div>
      </ShapeSection>
      <div className="container xl:max-w-6xl py-12 leading-relaxed">
        <div className="leading-loose font-light lg:w-2/3 lg:pr-24">
          <Mdx components={components} />
        </div>
      </div>
    </>
  );
}
