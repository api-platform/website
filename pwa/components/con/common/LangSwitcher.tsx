"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Locale, i18n } from "i18n/i18n-config";
import classNames from "classnames";

interface LangSwitcherProps {
  locale?: Locale;
}

export default function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { locales, defaultLocale } = i18n;

  const getSwitchLink = (newLocale: Locale) =>
    defaultLocale === locale
      ? `/${newLocale}${pathname}`
      : `${pathname?.replace(`/${locale}`, `/${newLocale}`)}`;

  return (
    <div className="relative bg-white text-blue cursor-pointer">
      <button
        onClick={() => setOpened(!opened)}
        className="flex items-center font-bold uppercase px-2 gap-1"
      >
        <span>{locale}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          className={classNames(
            "w-5 h-5 transition-all",
            opened && "rotate-180"
          )}
        >
          <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className="absolute right-0 top-full flex flex-col w-full">
        <div className="relative w-full overflow-hidden">
          <div
            className={classNames(
              "transition-all bg-white",
              opened
                ? "-translate-y-0 opacity-100"
                : "-translate-y-full opacity-100"
            )}
          >
            {locales
              .filter((l) => l !== locale)
              .map((newLocale: Locale) => (
                <a
                  key={locale}
                  className="z-10 w-full px-2 block"
                  href={getSwitchLink(newLocale)}
                >
                  {newLocale}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
