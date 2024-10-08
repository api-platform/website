"use client";

import classNames from "classnames";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function StackSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const stack = searchParams.get("s");
  const router = useRouter();

  const onStackChoose = useCallback(
    (s?: string) => {
      if (!s) router.replace(pathname);
      else router.replace(pathname + "?s=" + s);
    },
    [pathname, router]
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white dark:text-blue-black text-sm uppercase font-title font-semibold">
        Choose your favorite stack :
      </p>
      <div className="bg-white px-1 py-1 rounded-[50px] shadow-2xl">
        <div className=" text-text-primary flex flex-row gap-2 h-12 items-center uppercase font-semibold relative text-base">
          <div
            className={classNames(
              "h-full absolute rounded-[50px] top-1/2 -translate-y-1/2 transition-all duration-500 shadow-lg",
              stack === "symfony"
                ? "left-full -translate-x-full bg-[#000] w-32"
                : stack === "laravel"
                ? "left-0 w-32 bg-[#ff2d20]"
                : "left-1/2 bg-blue-extralight w-12 -translate-x-1/2"
            )}
          />
          <button
            onClick={() => onStackChoose("laravel")}
            className={classNames(
              "flex flex-row w-32 gap-2 h-full rounded-[50px] relative items-center justify-center z-20 transition-all",
              stack !== "laravel"
                ? "text-[#ff2d20] hover:bg-[#ff2d20]/10"
                : "text-white delay-200"
            )}
          >
            {!stack && <div className="absolute left-0 w-40 h-12 top-0" />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2413.7 2484.79"
              className="w-6 fill-current"
            >
              <path
                strokeWidth="0"
                d="M2412.34 562.12c.89 3.31 1.35 6.73 1.36 10.16v533.35c0 13.93-7.45 26.8-19.54 33.74l-447.65 257.73v510.85c0 13.9-7.39 26.74-19.44 33.74l-934.44 537.92c-2.14 1.22-4.47 1.99-6.81 2.82-.87.29-1.7.83-2.63 1.07a39.134 39.134 0 01-19.93 0c-1.07-.29-2.04-.88-3.06-1.26-2.14-.78-4.37-1.46-6.42-2.63L19.54 1941.69A38.933 38.933 0 010 1907.95V307.89c0-3.5.49-6.9 1.36-10.21.29-1.12.97-2.14 1.36-3.26.73-2.04 1.41-4.13 2.48-6.03.73-1.26 1.8-2.28 2.67-3.45 1.12-1.56 2.14-3.16 3.45-4.52 1.12-1.12 2.58-1.94 3.84-2.92 1.41-1.17 2.67-2.43 4.28-3.35h.05L486.64 5.2a38.973 38.973 0 0138.89 0l467.15 268.96h.1c1.56.97 2.87 2.19 4.28 3.31 1.26.97 2.67 1.85 3.79 2.92 1.36 1.41 2.33 3.01 3.5 4.57.83 1.17 1.94 2.19 2.63 3.45 1.12 1.94 1.75 3.99 2.53 6.03.39 1.12 1.07 2.14 1.36 3.31.89 3.31 1.35 6.73 1.36 10.16v999.38l389.27-224.14v-510.9c0-3.4.49-6.85 1.36-10.11.34-1.17.97-2.19 1.36-3.31.78-2.04 1.46-4.13 2.53-6.03.73-1.26 1.8-2.28 2.63-3.45 1.17-1.56 2.14-3.16 3.5-4.52 1.12-1.12 2.53-1.94 3.79-2.92 1.46-1.17 2.72-2.43 4.28-3.35h.05l467.19-268.96a38.924 38.924 0 0138.89 0l467.15 268.96c1.65.97 2.92 2.19 4.37 3.31 1.22.97 2.63 1.85 3.74 2.92 1.36 1.41 2.33 3.01 3.5 4.57.88 1.17 1.94 2.19 2.63 3.45 1.12 1.9 1.75 3.99 2.53 6.03.44 1.12 1.07 2.14 1.36 3.31zm-76.51 521.01V639.61l-163.48 94.11-225.84 130.03v443.52l389.37-224.14h-.05zm-467.15 802.31v-443.81l-222.15 126.87-634.37 362.05v447.99l856.51-493.1zM77.87 375.22v1510.23l856.42 493.05v-447.9l-447.41-253.21-.15-.1-.19-.1c-1.51-.88-2.77-2.14-4.18-3.21-1.22-.97-2.62-1.75-3.69-2.82l-.1-.15c-1.26-1.22-2.14-2.72-3.21-4.08-.97-1.31-2.14-2.43-2.92-3.79l-.05-.15c-.87-1.46-1.41-3.21-2.04-4.86-.63-1.46-1.46-2.82-1.85-4.37v-.05c-.49-1.85-.58-3.79-.78-5.69-.19-1.46-.58-2.92-.58-4.37V599.36l-225.8-130.08-163.48-94.01v-.05zM506.13 83.85L116.91 307.89l389.13 224.05 389.17-224.09-389.18-224h.1zm202.41 1398.23l225.8-129.98V375.22l-163.48 94.11-225.84 130.03v976.87l163.53-94.16zM1907.62 348.24l-389.17 224.05 389.17 224.05 389.13-224.09-389.13-224zm-38.94 515.51l-225.84-130.03-163.48-94.11v443.52l225.8 129.98 163.53 94.16V863.75zm-895.5 999.48l570.83-325.88 285.34-162.84-388.88-223.9-447.75 257.78-408.08 234.93 388.54 219.91z"
              ></path>
            </svg>
            <span>Laravel</span>
          </button>
          {stack ? (
            <button
              onClick={() => onStackChoose(undefined)}
              className={classNames(
                "flex flex-row  items-center justify-center size-12 rounded-full z-30 opacity-50 text-text-primary/50 hover:bg-blue-extralight/50"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </button>
          ) : (
            <div
              className={classNames(
                "flex flex-row items-center justify-center size-12 rounded-full text-white z-10 overflow-hidden"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 relative"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 relative"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          )}
          <button
            onClick={() => onStackChoose("symfony")}
            className={classNames(
              "flex flex-row h-full rounded-[50px] w-32 gap-2 relative items-center justify-center z-20 transition-all",
              stack !== "symfony"
                ? " text-[#000] hover:bg-[#000]/10"
                : "text-white delay-200"
            )}
          >
            {!stack && <div className="absolute right-0 w-40 h-12 top-0" />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 112.16 112.17"
              className="w-6 fill-current"
            >
              <path
                strokeWidth="0"
                d="M56.08 0C25.11 0 0 25.11 0 56.08s25.11 56.09 56.08 56.09 56.08-25.11 56.08-56.09S87.06 0 56.08 0zm30.25 32.46c-2.6.09-4.39-1.46-4.47-3.82-.03-.86.19-1.62.79-2.5.58-1.13.7-1.26.69-1.76-.05-1.49-2.29-1.54-2.91-1.51-8.42.28-10.64 11.64-12.44 20.88l-.88 4.87c4.85.71 8.29-.17 10.21-1.41 2.7-1.76-.76-3.56-.32-5.55.44-2.03 2.29-3.02 3.76-3.06 2.06-.05 3.53 2.08 3.48 4.25-.07 3.58-4.82 8.5-14.33 8.3-1.16-.03-2.22-.11-3.22-.23l-1.79 9.9c-1.61 7.5-3.74 17.74-11.37 26.67-6.55 7.79-13.21 9-16.19 9.11-5.57.19-9.27-2.78-9.4-6.75-.13-3.84 3.27-5.94 5.5-6.01 2.97-.1 5.03 2.06 5.11 4.54.08 2.1-1.02 2.76-1.75 3.16-.48.39-1.21.79-1.19 1.65.02.37.42 1.22 1.65 1.19 2.36-.08 3.92-1.25 5.01-2.03 5.43-4.52 7.52-12.41 10.26-26.76l.57-3.48c.93-4.67 1.97-9.87 3.55-15.06-3.83-2.88-6.12-6.46-11.27-7.85-3.53-.96-5.68-.14-7.19 1.77-1.79 2.27-1.2 5.21.53 6.94l2.86 3.16c3.51 4.05 5.42 7.2 4.7 11.44-1.15 6.77-9.21 11.96-18.74 9.03-8.14-2.51-9.66-8.27-8.68-11.44.86-2.79 3.08-3.32 5.25-2.66 2.33.72 3.23 3.54 2.57 5.71-.08.23-.19.62-.44 1.14-.27.6-.77 1.12-.98 1.82-.52 1.7 1.81 2.91 3.44 3.41 3.64 1.12 7.19-.78 8.09-3.73.84-2.71-.88-4.59-1.58-5.32l-3.45-3.69c-1.58-1.76-5.05-6.65-3.35-12.15.65-2.12 2.03-4.37 4.02-5.86 4.21-3.14 8.79-3.65 13.15-2.4 5.64 1.62 8.35 5.35 11.86 8.23 1.97-5.77 4.69-11.41 8.79-16.18 3.7-4.34 8.68-7.48 14.37-7.68 5.69-.19 9.99 2.39 10.14 6.48.06 1.74-.94 5.12-4.41 5.23z"
              ></path>
            </svg>
            <span>Symfony</span>
          </button>
        </div>
      </div>
    </div>
  );
}
