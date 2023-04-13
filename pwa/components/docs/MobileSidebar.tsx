"use client";

import classNames from "classnames";
import { DocContext } from "contexts/DocContext";
import useOnClickOutside from "hooks/useOnClickOutside";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import DocMenu, { NavPartProps } from "./DocMenu";

export default function MobileSideBar({
  docMenuParts,
}: {
  docMenuParts: NavPartProps[];
}) {
  const [isOpen, setOpen] = useState(false);
  const { breadCrumbs, setBreadCrumbs } = useContext(DocContext);
  const pathname = usePathname();

  const menu = useRef<HTMLDivElement>(null);

  useOnClickOutside(menu, () => setOpen(false));

  useEffect(() => {
    setBreadCrumbs([]);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <div
      className={classNames(
        "sticky max-w-8xl px-6 top-16 w-full h-12 bg-white dark:bg-blue-black flex flex-row items-center border-b-px border-gray-300 dark:border-blue-dark text-blue | md:hidden",
        isOpen ? "z-50" : "z-40"
      )}
    >
      <button onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div className="pl-4 flex flex-row gap-1 items-center justify-center leading-none text-sm font-light text-text-secondary">
        {breadCrumbs.map((docLink, index) => (
          <Fragment key={docLink.title}>
            {docLink.link ? (
              <Link
                className="transition-all hover:text-blue text-ellipsis whitespace-nowrap overflow-hidden"
                href={docLink.link}
              >
                {docLink.title}
              </Link>
            ) : (
              <span
                className={`${
                  index === breadCrumbs.length - 1 &&
                  "font-bold text-text-primary text-ellipsis whitespace-nowrap overflow-hidden"
                }`}
              >
                {docLink.title}
              </span>
            )}
            {index !== breadCrumbs.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 translate-y-px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </Fragment>
        ))}
      </div>
      <div
        className={classNames(
          "fixed z-50 inset-0 transition-all",
          isOpen
            ? "backdrop-blur-sm bg-blue/30"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={menu}
          className={classNames(
            "relative w-3/4 sm:w-2/3 bg-white dark:bg-blue-black h-full flex flex-col overflow-y-auto shadow-md transition-all duration-300",
            !isOpen && "-translate-x-full"
          )}
        >
          <button
            className="w-full h-12 bg-white dark:bg-blue-black px-4 py-2 z-10 block sticky top-0"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 ml-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="py-12 px-6">
            <DocMenu parts={docMenuParts} />
          </div>
        </div>
      </div>
    </div>
  );
}
