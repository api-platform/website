import classNames from "classnames";
import TextIconInfo from "components/common/TextIconInfo";
import { Clock, Location } from "components/icons";
import { toLocaleDate } from "utils";

export default function EventInfosCard({
  startDate,
  city,
  highlightIcons,
  className,
}: {
  startDate: string;
  endDate?: string;
  city?: string;
  highlightIcons?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "flex-wrap flex justify-start flex-row gap-4",
        className
      )}
    >
      {city ? (
        <TextIconInfo higlightIcon={highlightIcons} Icon={Location}>
          {city}
        </TextIconInfo>
      ) : null}
      <TextIconInfo Icon={Clock} higlightIcon={highlightIcons}>
        {toLocaleDate(startDate)}
      </TextIconInfo>
    </div>
  );
}
