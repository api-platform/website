import classNames from "classnames";
import Image from "next/image";
import { Reference } from "types";

interface LogoItemProps {
  reference: Reference;
  direction: "right" | "left";
  count: number;
  currentIndex: number;
}

export default function LogoItem({
  direction,
  reference,
  count,
  currentIndex,
}: LogoItemProps) {
  let lineClassName;
  let backgroundClassName;
  let decalage;
  let angle;
  let rotation;

  if (currentIndex < Math.floor(count / 2)) {
    angle =
      (Math.floor(count / 2) - currentIndex) * 15 -
      (count % 2 === 0 && count > 2 ? 15 : 0);
    decalage = currentIndex;
  } else {
    decalage = count - currentIndex - 1;
    angle = (Math.floor(count / 2) - currentIndex) * 15;
  }

  if (direction === "right") angle = -angle;

  if (angle > 0) rotation = `rotate-${angle}`;
  else rotation = `-rotate-${-angle}`;

  if (currentIndex % 3 === 0)
    backgroundClassName = "bg-blue-light before:bg-blue-light";
  else if (currentIndex % 2 === 0)
    backgroundClassName = "bg-blue-dark before:bg-blue-dark";
  else backgroundClassName = "bg-blue before:bg-blue";
  switch (direction) {
    case "right":
      lineClassName = `before:right-full before:origin-right translate-x-${
        8 * decalage
      } before:${rotation} md:translate-x-${12 * decalage}`;
      break;
    case "left":
      lineClassName = `before:origin-left before:left-full -translate-x-${
        8 * decalage
      } before:${rotation} md:-translate-x-${12 * decalage}`;
      break;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={reference.link}
      className={classNames(
        "cursor-pointer m-2 px-5 py-3 h-10 rounded-[36px] relative before:h-0.5 before:w-48 before:top-1/2 before:absolute | md:h-12 | lg:before:w-60 lg:m-3 lg:py-3 lg:h-14",
        backgroundClassName,
        lineClassName
      )}
      title={reference.name}
    >
      <Image
        alt=""
        src={`/images/references/oss/${reference.logo}.png`}
        height={50}
        width={200}
        className="h-full w-auto brightness-0 invert"
      />
    </a>
  );
}
