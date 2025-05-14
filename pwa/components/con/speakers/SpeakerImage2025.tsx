import React from "react";
import classNames from "classnames";
import { Speaker } from "types/con";

interface SpeakerImageProps {
  image: string;
  placeholder?: string;
  hoverable?: boolean;
  big?: boolean;
  speaker: Speaker;
}

function nameToAngle(name: string): number {
  const nameToHash = name.substring(0, 12);
  let hash = 0;
  for (let i = 0; i < nameToHash.length; i++) {
    hash += nameToHash.charCodeAt(i);
  }
  let angle = hash % 360;

  const forbiddenZones: [number, number][] = [
    [60, 120],
    [240, 300],
  ];

  for (const [start, end] of forbiddenZones) {
    if (angle >= start && angle < end) {
      angle = end;
      break;
    }
  }

  return angle * (Math.PI / 180);
}

function nameToSize(name: string, min = 10, max = 30) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += (i + 1) * name.charCodeAt(i);
  }
  const range = max - min;
  return min + (hash % range);
}

function cssPositionOnCircle(angle: number) {
  return {
    x: `calc(50% + ${Math.cos(angle) * 50}%)`,
    y: `calc(50% + ${Math.sin(angle) * 50}%)`,
    x2: `calc(50% + ${Math.cos(angle + Math.PI) * 50}%)`,
    y2: `calc(50% + ${Math.sin(angle + Math.PI) * 50}%)`,
  };
}

export default function SpeakerImage({
  image,
  big = false,
  hoverable = true,
  speaker,
}: SpeakerImageProps) {
  if (speaker.edition === "2025") {
    const { name } = speaker;
    const angle = nameToAngle(name);
    const size = nameToSize(name);
    const pos = cssPositionOnCircle(angle);
    return (
      <>
        <svg width="0" height="0">
          <clipPath id={`clip-${speaker.id}`} clipPathUnits="objectBoundingBox">
            <path
              d={
                speaker.path ||
                "M1,0 H0 V0.55125 H0.13225 c-0.00475,0.02385,-0.00725,0.0485,-0.00725,0.07375 c0,0.2071,0.1679,0.375,0.375,0.375 s0.375,-0.1679,0.375,-0.375 c0,-0.02525,-0.0025,-0.0499,-0.00725,-0.07375 H1 V0 Z"
              }
            />
          </clipPath>
        </svg>
        <div
          className={classNames(
            "w-full h-full relative bg-white rounded-full transition-all duration-500",
            hoverable && "group-hover:bg-blue-light "
          )}
        >
          <div
            className={classNames(
              "relative w-full h-full before:absolute before:w-[110%] before:h-[110%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none before:transition-all before:bg-circle before:bg-no-repeat before:duration-700 before:ease-out",
              hoverable && "group-hover:before:rotate-45"
            )}
          >
            <div
              className="aspect-square overflow-hidden w-[calc(400%/3)] pointer-events-none max-w-none absolute z-10 bottom-0 left-1/2 -translate-x-1/2"
              style={{ clipPath: `url(#clip-${speaker.id})` }}
            >
              <img
                src={image}
                className={classNames(
                  "w-full h-full transition-all duration-500 will-change-transform origin-center",
                  big && "scale-110",
                  hoverable && "group-hover:-rotate-2 group-hover:scale-110 "
                )}
                alt=""
              />
            </div>
            <div
              className={classNames(
                "absolute aspect-square -translate-x-1/2 -translate-y-1/2 transition-all duration-700",
                big && "scale-[150%]",
                hoverable && "group-hover:scale-[200%]"
              )}
              style={{
                left: pos.x,
                top: pos.y,
                width: `${size}%`,
              }}
            >
              <div
                className={classNames(
                  "bg-pink/20 animate-float rounded-full size-full",
                  big && "scale-[150%]"
                )}
              />
            </div>
            <div
              className={classNames(
                "absolute z-20 aspect-square -translate-x-1/2 -translate-y-1/2 transition-all duration-700",
                hoverable && "group-hover:scale-[40%]"
              )}
              style={{
                left: pos.x2,
                top: pos.y2,
                width: `${50 - size}%`,
              }}
            >
              <div
                className={classNames(
                  "bg-blue/30 animate-float2 rounded-full size-full",
                  big && "scale-[60%]"
                )}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
