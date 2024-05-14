"use client";
import Heading from "components/common/typography/Heading";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Event as EventType } from "types";
import EventFilterDropDown from "./EventFilterDropDown";
import EventCard from "./EventCard";
import ShapeSection from "components/common/ShapeSection";
import Image from "next/image";

interface EventsPageProps {
  events: EventType[];
}

export default function EventsPage({ events }: EventsPageProps) {
  const [type, setType] = useState<string | undefined>(undefined);

  const filteredEvents = events.filter(
    (event) => !type || event.type === type.toLowerCase()
  );

  const eventsByYear = useMemo(
    () =>
      filteredEvents.reduce((acc, event) => {
        const year = dayjs(event.startDate.date).year().toString();
        if (acc[year] === undefined) acc[year] = [event];
        else acc[year].push(event);
        return acc;
      }, {} as Record<string, EventType[]>),
    [filteredEvents]
  );

  const apiConEvent = {
    type: "conference",
    venue: {
      city: "Lille",
    },
    startDate: {
      date: "2024-09-19",
    },
    endDate: {
      date: "2024-09-20",
    },
    picture: `/images/con/og-2021.png`,
    title: "API Platform Conference 2024",
    slug: "api-con",
  };

  return (
    <div className="bg-gray-100 dark:bg-blue-black pb-12 relative after:absolute after:w-full after:h-80 after:top-full after:left-0 after:bg-gray-100 after:dark:bg-blue-black">
      <ShapeSection
        className="bg-blue-black h-[75vh]"
        effect="right-triangle"
        maskColor="gray-100"
        darkModeColor="blue-black"
      >
        <div className="absolute left-0 top-0 w-full h-full opacity-70 z-0">
          <Image
            src="/images/events_cover.jpg"
            fill
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="container relative z-10 py-24 text-white flex flex-col justify-center min-h-full">
          <Heading size="xl" level="h1" className="pt-8">
            Our <strong>events</strong>
          </Heading>
          <p className="mt-2 font-light text-lg max-w-xl">
            International conferences, meetings or even workshops: take a look
            at the API Platform community and don&apos;t miss any event.
          </p>
        </div>
      </ShapeSection>
      <div className="container relative pb-6">
        <div className="w-full border-t-[8px] border-t-blue dark:border-t-blue-black mx-auto p-5 -mt-24 text-center bg-white dark:bg-blue-dark shadow-md | md:-mt-12 md:p-0 md:border-t-0 md:text-left md:w-fit md:shadow-none md:bg-transparent dark:md:bg-transparent md:mr-0 md:ml-auto">
          <p className="mb-2 font-bold text-sm uppercase">
            Filter by event type
          </p>
          <EventFilterDropDown
            value={type}
            onChange={setType}
            className="border-px border-gray-300 dark:border-blue w-40 mx-auto"
          />
        </div>
      </div>
      <div className="container">
        {!type || type.toLowerCase() === "conference" ? (
          <div className="mb-12">
            <Heading
              level="h2"
              size="lg"
              className="w-full border-b-2 border-b-blue mb-4"
            >
              API Platform Conference
            </Heading>
            <div className="grid grid-cols-1 gap-4">
              <EventCard
                event={apiConEvent}
                link="/con"
                description="The flagship event dedicated to API Platform and its ecosystem! Get ready for two days of ideas and knowledge-sharing with our incredible lineup of renowned PHP, JavaScript, and API specialists."
              />
            </div>
          </div>
        ) : null}
        {Object.keys(eventsByYear)
          .sort()
          .reverse()
          .map((year) => (
            <div key={year} className="mb-12 last:mb-0">
              <Heading
                level="h2"
                size="lg"
                className="w-full border-b-2 border-b-blue mb-4"
              >
                {year}
              </Heading>
              <div className="grid grid-cols-1 place-content-center lg:grid-cols-2 gap-4 sm:gap-6">
                {eventsByYear[year].map((event: EventType, index: number) => (
                  <EventCard key={`${event.link}${index}`} event={event} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
