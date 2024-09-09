"use client";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

export default function CoverCircleStacks() {
  const searchParams = useSearchParams();
  const stack = searchParams.get("s");

  return (
    <div className="w-[180%] aspect-square relative -translate-x-1/2 left-1/2 top-full -translate-y-1/4 | xl:-translate-y-[22%] xl:w-[200%] | 2xl:-translate-y-1/4">
      <div
        id="#laravel_back"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all duration-700",
          stack === "laravel" ? "rotate-0" : "-rotate-90 scale-50"
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
          stack === "laravel" ? "rotate-90 scale-50" : "-rotate-0"
        )}
      >
        {" "}
        <img
          src="/images/cover/symfony-back.svg"
          alt=""
          className="absolute top-0 -translate-y-[60%] left-[55%] -translate-x-1/2 w-[60%]"
        />
      </div>
      <div className="relative w-full h-full bg-blue-extralight dark:bg-blue-dark rounded-full z-10" />
      <div
        id="#laravel_front"
        className={classNames(
          "absolute left-0 top-0 w-full h-full transition-all z-20 duration-1000",
          stack === "laravel" ? "rotate-0" : "-rotate-90"
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
          stack === "laravel" ? "rotate-90" : "rotate-0"
        )}
      >
        <img
          src="/images/cover/symfony-front.svg"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[70%] w-[30%]"
        />
      </div>
    </div>
  );
}
