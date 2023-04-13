import { Clock, IconProps, Location, Users, Website } from "components/icons";
import { convertTime, toLocaleDate } from "utils";
import Link from "next/link";
import { Event as EventType } from "types";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import EventImage from "../../components/EventImage";
import Card from "components/common/Card";

interface EventInfoLineProps extends PropsWithChildren {
  Icon: React.ComponentType<IconProps>;
}

function EventInfoLine({ Icon, children }: EventInfoLineProps) {
  return (
    <div className="flex flex-row items-center py-1 even:pl-4 odd:border-r-2 border-r-gray-300 border-dotted border-t-2 border-t-gray-300 [&:nth-child(-n+2)]:border-t-0 | lg:even:pl-0 lg:px-0 lg:[&:nth-child(2)]:border-t-2 lg:odd:border-r-0">
      <Icon className="h-8 w-8 text-blue mr-2" />
      <div className="flex flex-col text-left gap-px leading-tight">
        {children}
      </div>
    </div>
  );
}

export default function EventInfosCard({ event }: { event: EventType }) {
  const { link, venue, startDate, endDate, speakers } = event;

  return (
    <Card className="text-text-secondary dark:text-gray-100 text-sm z-10 mx-auto transition-all lg:rotate-2 shadow-md w-4/5 lg:w-1/3 translate-y-6 hover:shadow-xl hover:scale-105 | lg:mb-0 lg:absolute lg:top-24 lg:right-0">
      <div className="hidden lg:block aspect-[8/5] w-full px-3 pt-3">
        <EventImage event={event} className="w-full h-full object-cover" />
      </div>
      <div className="px-3 py-2 grid grid-cols-2 | lg:grid-cols-1">
        <EventInfoLine Icon={Location}>
          {venue.name ? <p className="font-bold">{venue.name}</p> : null}
          {venue.address ? <p className="font-light">{venue.address}</p> : null}
          {venue.city || venue.country ? (
            <p>
              {venue.city ? (
                <span className="font-light">{venue.city}</span>
              ) : null}
              {venue.country ? (
                <>
                  {venue.city ? ", " : ""}
                  <span className="font-light">{venue.country}</span>
                </>
              ) : null}
            </p>
          ) : null}
        </EventInfoLine>
        <EventInfoLine Icon={Clock}>
          {startDate && endDate && startDate.date !== endDate.date ? (
            <p>{`${toLocaleDate(startDate.date)} - ${toLocaleDate(
              endDate.date
            )}`}</p>
          ) : (
            <>
              <p className="font-bold">{toLocaleDate(startDate.date)}</p>
              {startDate.time && (
                <p className="text-sm">{`${convertTime(startDate.time)} ${
                  endDate?.time ? ` - ${convertTime(endDate.time)}` : null
                }`}</p>
              )}
            </>
          )}
        </EventInfoLine>
        {link && (
          <EventInfoLine Icon={Website}>
            <a
              href={link}
              className="link"
              rel="noopener noreferrer"
              target="_blank"
            >
              Event website
            </a>
          </EventInfoLine>
        )}
        {speakers?.length && (
          <EventInfoLine Icon={Users}>
            {speakers.map((speaker) =>
              speaker.link ? (
                <Link
                  className={classNames(
                    "link",
                    speakers.length > 1 && "text-xs leading-tight"
                  )}
                  key={speaker.name}
                  href={speaker.link}
                >
                  {speaker.name}
                </Link>
              ) : (
                <p
                  className={classNames(
                    speakers.length > 1 && "text-xs leading-tight"
                  )}
                  key={speaker.name}
                >
                  {speaker.name}
                </p>
              )
            )}
          </EventInfoLine>
        )}
      </div>
    </Card>
  );
}
