import Image from "next/image";
import { Event as EventType } from "types";

export default function EventInfosCard({
  event,
  width = 500,
  height = 300,
  className,
}: {
  event: EventType;
  width?: number;
  height?: number;
  className?: string;
}) {
  const { picture } = event;

  return (
    <Image
      alt=""
      src={picture || "/images/event-placeholder.png"}
      width={width}
      height={height}
      className={className}
    />
  );
}
