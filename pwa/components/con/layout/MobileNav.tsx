"use client";
import React, { useState, useCallback, useContext } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import styles from "./MobileNav.module.css";
import { Navigation } from "types/con";
import ConLink from "../common/ConLink";
import { LanguageContext } from "contexts/con/LanguageContext";

interface MobileNavType {
  nav?: Navigation;
}

export default function MobileNav({ nav }: MobileNavType) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { t } = useContext(LanguageContext);

  const toggleOpen = useCallback(() => {
    setOpened(!opened);
  }, [setOpened, opened]);

  return (
    <>
      <div
        className="fixed right-1 top-0 w-16 h-16 z-50 cursor-pointer block | lg:hidden"
        onClick={toggleOpen}
      >
        <div
          className={classNames(
            "relative h-1 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all before:absolute before:w-10 before:h-1 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:transition-all after:absolute after:w-10 after:left-1/2 after:top-1/2 after:h-1 after:bg-white after:-translate-x-1/2 after:transition-all",
            opened
              ? "w-0 before:-rotate-45 before:-translate-y-1/2 after:rotate-45 after:-translate-y-1/2"
              : "w-10 after:-translate-y-[calc(50%-10px)] before:-translate-y-[calc(50%+10px)]"
          )}
        />
      </div>

      <div
        className={classNames(
          "fixed font-title text-white z-40 w-screen h-screen flex items-center justify-center flex-col top-0 bg-blue-black after:bg-conf-gradient after:w-screen after:h-screen after:left-0 after:top-0 after:fixed",
          opened
            ? `left-0 opacity ${styles.fadeOut}`
            : `left-[100vw] opacity-0 pointer-events-none ${styles.fadeIn}`
        )}
      >
        <div
          onClick={toggleOpen}
          className={classNames(
            "text-base font-bold mb-[4vh] p-[2vh] uppercase transition-all z-50 relative",
            opened ? "opacity-1" : "opacity-0 translate-x-10"
          )}
        >
          {nav?.backLink && nav.backLink.to !== pathname ? (
            <ConLink key={nav.backLink.text} href={nav.backLink.to}>
              {`< ${t(nav.backLink.text)}`}
            </ConLink>
          ) : null}
        </div>
        {nav?.links.map((link) => (
          <div
            key={link.text}
            className={classNames(
              "text-[3vh] sm:text-[5vh] text-center font-bold p-[2vh] uppercase transition-all z-50 relative",
              opened ? "opacity-1" : "opacity-0 translate-x-10",
              link.to === pathname ? "text-blue" : "text-white"
            )}
            onClick={toggleOpen}
          >
            <ConLink href={link.to}>{t(link.text)}</ConLink>
          </div>
        ))}
      </div>
    </>
  );
}
