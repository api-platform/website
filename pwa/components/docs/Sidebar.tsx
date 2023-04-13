"use client";
import classNames from "classnames";
import { useState } from "react";
import DocMenu, { NavPartProps } from "./DocMenu";

export default function Sidebar({
  docMenuParts,
}: {
  docMenuParts: NavPartProps[];
}) {
  const [minimized, setMinimized] = useState(false);
  return (
    <div
      className={classNames(
        "hidden w-72 z-20 sticky border-r border-r-gray-300 dark:border-r-blue-dark text-sm top-16 h-[calc(100vh-64px)] transition-all duration-300 | md:block",
        minimized ? "w-px" : "w-72"
      )}
    >
      <button
        onClick={() => setMinimized(!minimized)}
        className={classNames(
          "w-6 h-8  shadow-md flex items-center justify-center absolute right-0 border-gray-100 top-2 z-50 rounded-l-md border-px border-r-0 transition-all duration-300",
          minimized
            ? "translate-x-full -scale-x-100 bg-blue dark:border-blue-dark text-white dark:text-blue-black"
            : "bg-white dark:bg-blue-black text-blue dark:border-blue"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className="w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <nav
        className={classNames(
          "relative w-72 h-full px-8 py-16 overflow-y-auto transition-all duration-300",
          minimized && "-translate-x-full"
        )}
      >
        {<DocMenu parts={docMenuParts} />}
      </nav>
    </div>
  );
}
