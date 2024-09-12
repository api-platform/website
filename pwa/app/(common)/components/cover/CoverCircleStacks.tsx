"use client";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import WebbyChoice from "./WebbyChoice";
import LaravelSign from "./LaravelSign";
import SymfonySign from "./SymfonySign";
import { useCallback, useState } from "react";

export default function CoverCircleStacks() {
  const searchParams = useSearchParams();
  const stack = searchParams.get("s");
  const [percentage, setPercentage] = useState(50); // Pourcentage

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } =
        event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - left;
      const mouseY = event.clientY - top;

      const percentX = (mouseX / width) * 100;
      const percentY = (mouseY / height) * 100;
      if (percentY > -20 && percentY < 10) setPercentage(Math.round(percentX));
    },
    []
  );

  return (
    <div className="w-[180%] aspect-square relative -translate-x-1/2 left-1/2 top-full -translate-y-[20%] | xl:-translate-y-[22%] xl:w-[200%] | 2xl:-translate-y-1/4">
      <div
        id="#laravel_back"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all duration-700",
          stack === "laravel"
            ? "rotate-0"
            : stack === "symfony"
            ? "-rotate-180 scale-50"
            : "-rotate-90 scale-50"
        )}
      >
        <img
          src="/images/cover/laravel-back.svg"
          alt=""
          className="absolute top-0 -translate-y-[55%] left-1/2 -translate-x-1/2 w-4/5"
        />
      </div>
      <div
        id="#symfony_back"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all duration-700",
          stack === "laravel"
            ? "rotate-90 scale-50"
            : stack === "symfony"
            ? "-rotate-0"
            : "rotate-90 scale-50"
        )}
      >
        {" "}
        <img
          src="/images/cover/symfony-back.svg"
          alt=""
          className="absolute top-0 -translate-y-[60%] left-[55%] -translate-x-1/2 w-[60%]"
        />
      </div>
      <div
        id="#choice_back"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all duration-700",
          stack === "laravel"
            ? "rotate-90 scale-50"
            : stack === "symfony"
            ? "-rotate-90 scale-50"
            : "-rotate-0"
        )}
      >
        {" "}
        <img
          src="/images/cover/choice-back.svg"
          alt=""
          className="absolute top-0 -translate-y-[60%] left-[55%] -translate-x-1/2 w-[60%]"
        />
      </div>
      <div className="relative w-full h-full bg-blue-extralight dark:bg-blue-dark rounded-full z-10" />
      <div
        id="#laravel_front"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all z-20 duration-1000",
          stack === "laravel"
            ? "rotate-0"
            : stack === "symfony"
            ? "-rotate-180"
            : "-rotate-90"
        )}
      >
        <img
          src="/images/cover/laravel-front.svg"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-1/2"
        />
      </div>
      <div
        id="#symfony_front"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all z-20 duration-1000",
          stack === "laravel"
            ? "rotate-90"
            : stack === "symfony"
            ? "-rotate-0"
            : "rotate-90"
        )}
      >
        <img
          src="/images/cover/symfony-front.svg"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[65%] w-[40%]"
        />
      </div>
      <div
        id="#choice_front"
        onMouseMove={handleMouseMove}
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all duration-1000 z-50",
          stack === "laravel"
            ? "rotate-90 opacity-0"
            : stack === "symfony"
            ? "-rotate-90 opacity-0"
            : "-rotate-0"
        )}
      >
        <LaravelSign
          active={percentage < 45}
          className={classNames(
            "absolute cursor-pointer w-[20%] left-1/2 top-0 -translate-y-[80%] -translate-x-[130%] z-40 transition-all duration-500 origin-bottom-right",
            percentage < 45 && "scale-110"
          )}
        />
        <SymfonySign
          active={percentage > 55}
          className={classNames(
            "absolute cursor-pointer w-[18%] left-1/2 top-0 -translate-y-[80%] translate-x-[50%] z-40 transition-all duration-500 origin-bottom-left",
            percentage > 55 && "scale-110"
          )}
        />
        <WebbyChoice
          className="absolute w-[18%] left-1/2 top-0 -translate-y-[50%] -translate-x-[50%] z-40"
          percentEyes={percentage}
        />
      </div>
    </div>
  );
}
