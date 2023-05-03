"use client";
import classNames from "classnames";
import Logo from "components/common/Logo";
import ThemeToggle from "components/common/ThemeToggle";
import { Github } from "components/icons/social";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function Nav() {
  const pathname = usePathname();
  const withBg = pathname !== "/";
  const fixed = pathname?.startsWith("/docs");

  return (
    <div
      className={classNames(
        "top-0 left-0 w-full absolute z-50",
        withBg && "bg-white dark:bg-blue-darkest shadow-md",
        fixed ? "sticky" : "absolute"
      )}
    >
      <nav
        className={classNames(
          "mx-auto px-6 md:px-8 h-16 flex flex-row items-center",
          withBg
            ? "text-blue-black dark:text-white"
            : "text-white dark:text-blue-black",
          fixed ? "max-w-8xl" : "container"
        )}
      >
        <NavLink
          href="/"
          className={classNames(
            "flex-1 flex flex-row",
            withBg ? "text-blue" : "text-inherit"
          )}
          title="Api Platform"
        >
          <Logo className="h-5" inline />
        </NavLink>
        <div className="hidden flex-row gap-6 md:flex justify-center items-center">
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="https://api-platform.myspreadshop.net/">Shop</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/help">Need help?</NavLink>
          <NavLink href="/playground">Try API Platform</NavLink>
          <div className="border-l-2 pl-6 border-current">
            <Github className="h-5 w-5" />
          </div>
          <div className="border-l-2 pl-4 border-current">
            <ThemeToggle withBgNav={withBg} />
          </div>
        </div>
      </nav>
    </div>
  );
}
