"use client";

import classNames from "classnames";
import Moon from "./Moon";
import Sun from "./Sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleTheme({ withBgNav }: { withBgNav: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div className="flex flex-row pl-4">
        <div
          className="relative block w-7 h-4 rounded-2xl cursor-pointer bg-blue-extralight"
          title={`Switch to ${
            resolvedTheme === "light" ? "dark" : "light"
          } mode`}
          onClick={toggleTheme}
        >
          {mounted ? (
            <div
              className={classNames(
                "absolute top-1/2 w-6 h-6 rounded-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-all duration-[400ms] shadow-md",
                resolvedTheme === "dark" ? "left-full" : "left-0",
                withBgNav ? "bg-blue" : "bg-white dark:bg-blue-black"
              )}
            >
              <div
                className={classNames(
                  "relative w-6 h-6",
                  withBgNav ? "text-white dark:text-blue-darkest" : "text-blue"
                )}
              >
                <Moon theme={resolvedTheme} />
                <Sun theme={resolvedTheme} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
