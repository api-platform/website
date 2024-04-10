"use client";
import classNames from "classnames";
import Logo from "components/common/Logo";
import ThemeToggle from "components/common/ThemeToggle";
import { Github, Mastodon, Twitter } from "components/icons/social";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { useState, useEffect } from "react";
import Preheader from "./Preheader";
import { DocSearch } from "@docsearch/react";
import { current } from "consts";
import LogoTilleuls from "components/common/LogoTilleuls";

export default function Nav({ withPreheader = false }) {
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // avoid error hydration due to docsearch
  const pathname = usePathname();
  const withBg = pathname !== "/";
  const isDocPage = pathname?.startsWith("/docs");

  const version = current;

  const withRyanHeader = true;

  const forceClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("resize", forceClose);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", forceClose);
    }
    return () => {
      window.removeEventListener("resize", forceClose);
    };
  }, [isOpen]);

  useEffect(() => {
    forceClose();
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {!isDocPage && withPreheader ? <Preheader /> : null}
      <div
        className={classNames(
          "left-0 w-full absolute z-50",
          withBg && "bg-white dark:bg-blue-darkest shadow-md",
          isDocPage ? "sticky" : "absolute",
          withPreheader && !isDocPage
            ? withRyanHeader
              ? "top-16 md:top-20"
              : "top-16"
            : "top-0"
        )}
      >
        <div
          onClick={forceClose}
          className={classNames(
            "fixed z-40 inset-0 transition-all duration-500",
            isOpen
              ? "backdrop-blur-sm bg-blue/30"
              : "opacity-0 pointer-events-none"
          )}
        />
        <nav
          className={classNames(
            "mx-auto px-6 md:px-8 h-16 flex flex-row items-center gap-x-6 w-full max-w-8xl",
            withBg
              ? "text-blue-black dark:text-white"
              : "text-white dark:text-blue-black"
          )}
        >
          <NavLink
            href="/"
            className={classNames(
              "flex-1 flex flex-row",
              withBg ? "text-blue" : "text-inherit"
            )}
            title="API Platform"
          >
            <div
              className={classNames(
                "w-[50px] h-[50px] bg-blue-extralight rounded-full flex items-center justify-center p-1 sm:hidden",
                withBg && "dark:bg-blue-light"
              )}
            >
              <img src="/images/logo_spider.svg" className="w-full" alt="" />
            </div>
            <div className="hidden sm:block">
              <Logo className="h-5" inline />
            </div>
          </NavLink>
          {isMounted &&
          process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID &&
          process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME &&
          process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY ? (
            <DocSearch
              appId={process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID}
              indexName={process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME}
              apiKey={process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY}
              searchParameters={{
                facetFilters: [`version:${version}`],
              }}
              transformItems={(items: any[]) => {
                return items.map((item) => ({
                  ...item,
                  url: item.url ? new URL(item.url).pathname : "/docs/",
                }));
              }}
              placeholder="Search..."
            />
          ) : null}
          <div
            className={classNames(
              "-lg:uppercase -lg:font-bold -lg:text-xl fixed h-screen w-5/6 max-w-md top-0 bg-white dark:bg-blue-black z-40 transition-all duration-500 flex flex-col gap-6 justify-start items-center",
              "lg:bg-transparent lg:dark:bg-transparent lg:h-auto lg:w-auto lg:flex-row lg:static lg:justify-end lg:max-w-none",
              isOpen
                ? "right-0 text-blue dark:text-blue-extralight"
                : "-right-full"
            )}
          >
            <div className="flex flex-col flex-1 items-center justify-center gap-5 lg:flex-row">
              <NavLink href="/docs/">Docs</NavLink>
              <NavLink href="https://symfonycasts.com/screencast/api-platform?cid=apip">
                Screencasts
              </NavLink>
              <NavLink href="https://api-platform.myspreadshop.net/">
                Shop
              </NavLink>
              <NavLink href="/events/">Events</NavLink>
              <NavLink href="/help/">Need&nbsp;help?</NavLink>
              <div
                className={classNames(
                  "lg:border-x-2 py-1 lg:px-4 flex flex-row gap-4 lg:gap-2.5",
                  withBg
                    ? "text-blue dark:text-blue-light lg:border-gray-300 lg:dark:border-white/50"
                    : "text-white lg:border-white/50 dark:text-blue-black dark:lg:border-blue-black/25"
                )}
              >
                <a
                  href="https://github.com/api-platform/api-platform"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Github className="h-7 w-7 lg:h-4 lg:w-4" />
                </a>
                <a
                  href="https://fosstodon.org/@ApiPlatform"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Mastodon className="h-7 w-7 lg:h-4 lg:w-4" />
                </a>
                <a
                  href="https://twitter.com/ApiPlatform"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Twitter className="h-7 w-7 lg:h-4 lg:w-4" />
                </a>
              </div>
              <a
                href="https://les-tilleuls.coop/en"
                target="_blank"
                rel="noreferer noopener"
                className="hidden flex-col justify-center items-center text-center xl:flex"
              >
                <p className="text-xs opacity-70 -mt-1">Powered by</p>
                <LogoTilleuls className="w-28" red={withBg} />
              </a>
            </div>
            <div
              className={classNames(
                "bg-blue text-white dark:text-blue-black py-16 w-full px-12 block text-center lg:hidden"
              )}
              title="API Platform"
            >
              <NavLink href="/" title="API Platform">
                <Logo className="w-full" inline />
              </NavLink>
              <p className="text-sm font-light mt-4">powered by</p>
              <a
                href="https://les-tilleuls.coop/en"
                target="_blank"
                rel="noreferer noopener"
                className="font-bold"
              >
                <LogoTilleuls className="max-w-[170px] mx-auto" />
              </a>
            </div>
          </div>
          <ThemeToggle withBgNav={withBg} />
          <div
            onClick={() => setOpen(!isOpen)}
            className={classNames(
              "w-7 h-5 flex relative items-center justify-center z-50 cursor-pointer",
              "lg:hidden",
              isOpen
                ? "text-blue dark:text-blue"
                : withBg
                ? "text-blue dark:text-blue-light"
                : "text-white dark:text-blue-black"
            )}
          >
            <div
              className={classNames(
                "h-0.75 bg-current transition-all",
                "after:absolute after:w-full after:left-1/2 after:h-0.75 after:bg-current  after:-translate-x-1/2 after:transition-all",
                "before:absolute before:w-full before:h-0.75 before:bg-current before:left-1/2 before:-translate-x-1/2 before:transition-all",
                isOpen
                  ? "w-0 before:top-1/2 after:top-1/2 before:-rotate-45 before:-translate-y-1/2 after:rotate-45 after:-translate-y-1/2"
                  : "w-8 before:top-0 after:bottom-0"
              )}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
