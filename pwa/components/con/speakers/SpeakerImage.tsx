import React from "react";
import Image from "next/image";
import classNames from "classnames";

interface SpeakerImageProps {
  image: string;
  placeholder?: string;
  hoverable?: boolean;
  big?: boolean;
}

export default function SpeakerImage({
  image,
  placeholder,
  big = false,
  hoverable = true,
}: SpeakerImageProps) {
  return (
    <div className="w-full h-full relative">
      <div
        className={classNames(
          "relative w-full h-full before:absolute before:w-[110%] before:h-[110%] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none before:transition-all before:bg-circle before:bg-no-repeat before:duration-700 before:ease-out",
          hoverable && "group-hover:before:rotate-45"
        )}
      >
        <div
          className={classNames(
            "rounded-full overflow-hidden w-full h-full relative after:absolute after:bg-blue-black after:opacity-0 after:w-full after:h-full after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:duration-500 after:transition-all after:rounded-full",
            hoverable &&
              "group-hover:after:opacity-50 group-hover:after:scale-95"
          )}
        >
          <Image
            src={image}
            className="rounded-full object-cover"
            alt=""
            fill
            sizes={big ? "(max-width: 768px) 240px, 440px" : "240px"}
            loading="lazy"
            placeholder={placeholder ? "blur" : undefined}
            blurDataURL={placeholder}
          />
        </div>
      </div>
      <svg
        className={classNames(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all justify-center items-center w-24 opacity-0",
          hoverable && "group-hover:opacity-100 group-hover:w-12"
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 281.49 281.49"
        fill="#ffff"
      >
        <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
        <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
      </svg>
    </div>
  );
}
