"use client";
import Arrow from "components/icons/arrow";
import { PropsWithChildren } from "react";
import useAnimation from "hooks/con/useAnimation";

interface ListPointsProps extends PropsWithChildren {
  direction: "left" | "right";
}

export default function ListPoint({
  children,
  direction = "left",
}: ListPointsProps) {
  const animation = useAnimation(
    direction,
    undefined,
    undefined,
    undefined,
    "-5% 0% -10%"
  );
  return (
    <div
      ref={animation}
      className="text-lg text-blue-black dark:text-white leading-tight mb-8 last:mb-0 flex flex-row justify-start | md:text-xl"
    >
      <Arrow className="text-blue w-7 h-7 mr-4" />
      <p className="flex-1">{children}</p>
    </div>
  );
}
