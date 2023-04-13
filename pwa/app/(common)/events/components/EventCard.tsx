import Card from "components/common/Card";
import Chip from "components/common/Chip";
import Heading from "components/common/typography/Heading";
import { Event as EventType } from "types";
import EventImage from "./EventImage";
import EventResumeInfos from "./EventResumeInfos";

interface EventCardProps {
  event: EventType;
  link?: string;
  description?: string;
}

export default function EventCard({
  event,
  link,
  description,
}: EventCardProps) {
  return (
    <Card
      key={event.title}
      link={link || `/events/${event.slug}`}
      className="flex flex-col | w-full sm:flex-row sm:min-h-[160px]"
    >
      <div className="hidden aspect-square h-full overflow-hidden relative sm:block">
        <EventImage
          width={160}
          height={160}
          event={event}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3 flex flex-1 flex-col items-start text-text-secondary dark:text-gray-300 text-sm">
        <Chip color="blue" size="small" text={event.type} />
        <div className="flex-1 mt-2 pb-4 sm:pb-2">
          <Heading
            size="sm"
            level="h3"
            className="line-clamp-2 text-blue-black dark:text-white "
          >
            {event.title}
          </Heading>
          {description ? (
            <p className="text-sm line-clamp-2">{description}</p>
          ) : null}
        </div>
        <EventResumeInfos
          city={event.venue.city}
          startDate={event.startDate.date}
          endDate={event.endDate?.date}
          highlightIcons
          className="text-xs md:text-sm"
        />
      </div>
    </Card>
  );
}
