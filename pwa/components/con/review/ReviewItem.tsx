import style from "./ReviewItem.module.css";
import React, { PropsWithChildren } from "react";
import useAnimation from "hooks/con/useAnimation";
import Image from "next/image";
import classNames from "classnames";

interface ReviewItemProps extends PropsWithChildren {
  title: JSX.Element;
  imageId: string;
  edition: string;
  size?: "xl" | "lg" | "base";
}

export default function ReviewItem({
  title,
  imageId,
  edition,
  size = "base",
  children,
}: ReviewItemProps) {
  const animationLeft = useAnimation("left", undefined, undefined, undefined);
  const animationRight = useAnimation("right");
  const animationScale = useAnimation(
    "scale",
    1.5,
    0.5,
    undefined,
    "0px 0px -20% 0px"
  );

  return (
    <div
      className={classNames(
        "flex flex-col items-center mt-0 mx-auto py-10 md:py-20 group | md:items-start md:translate-x-6 md:even:-translate-x-6",
        size === "lg" && "max-w-[1100px]",
        size === "base" && "max-w-5xl",
        size === "xl" && "max-w-[1280px]"
      )}
    >
      <div
        className={classNames(
          "flex justify-center items-center flex-wrap w-full | md:justify-start md:w-2/5 md:group-even:ml-auto",
          style.title
        )}
        ref={animationScale}
      >
        {title}
      </div>
      <div className="flex flex-col items-center w-full | md:flex-row md:items-start md:group-even:flex-row-reverse">
        <div
          className="w-5/6 ml-auto aspect-[3/2] relative z-10 before:bg-blue before:absolute before:w-full before:h-full before:top-4 before:left-4 md:group-odd:before:-left-4 | md:ml-0 md:w-1/2 "
          ref={animationLeft}
        >
          <Image
            src={`/images/con/${edition}/review/${imageId}.jpg`}
            alt=""
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 500px"
            className="object-cover"
          />
        </div>
        <div
          className="w-11/12 mr-auto z-0 relative | md:w-1/2"
          ref={animationRight}
        >
          <div
            className={classNames(
              "bg-white dotted-corner -translate-y-16 y-8 px-8 pt-24 pb-8 font-thin leading-relaxed group-even:corner-bottom | md:-translate-x-12 md:group-even:translate-x-12 md:pt-8 md:group-odd:pl-20 md:group-even:pr-20",
              style.content
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
