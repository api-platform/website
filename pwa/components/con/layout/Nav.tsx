"use client";
import { useContext, useCallback, useState, useEffect } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Navigation } from "types/con";
import { currentEdition } from "data/con/editions";
import BuyButton from "components/con/common/BuyButton";
import ConLink from "components/con/common/ConLink";
import Link from "next/link";
import { LanguageContext } from "contexts/con/LanguageContext";
import NavLink from "./NavLink";

interface NavProps {
  edition?: string;
  nav?: Navigation;
}

export default function Nav({ edition, nav }: NavProps) {
  const pathname = usePathname();
  const { t, locale } = useContext(LanguageContext);
  const logoAlwaysVisible = !pathname?.match(/\/con\/\d+(\/|)$/gi);
  const links = nav?.links.filter((link) => !link.mobileOnly);

  const [minified, setMinified] = useState(!logoAlwaysVisible);

  const onScroll = useCallback(() => {
    setMinified(50 > window.scrollY && !logoAlwaysVisible);
  }, [logoAlwaysVisible]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    onScroll();
  }, [pathname]);

  return (
    <nav
      className={classNames(
        "fixed h-16 z-20 w-full items-center justify-end text-white p-3 border-y font-title transition-all | md:flex",
        !minified &&
          "bg-conf-gradient bg-[length:100%_100vh] bg-blue-black shadow-md",
        minified ? "border-y-transparent" : "border-y-blue"
      )}
    >
      <ConLink
        className={classNames(
          "h-9 inline-flex justify-center items-center transition-all duration-300 pl-20 pr-12 mr-auto",
          !minified ? "opacity-1" : "opacity-0 -translate-y-full"
        )}
        href={edition ? `/${locale}/con/${edition}` : `/${locale}/con`}
      >
        <img
          src="/images/con/logo.svg"
          alt="Api Platform conference"
          width="150"
          height="35"
        />
        {edition ? (
          <div className="text-blue top-1/2 text-sm py-0.5 px-1 border-t-blue border-t -rotate-90">
            {edition}
          </div>
        ) : null}
      </ConLink>
      <Link
        href={nav?.logoLink || "/"}
        className={classNames(
          "w-20 h-[62px] absolute top-0 cursor-pointer bg-blue-gradient bg-blue flex items-center justify-center transition-all hover:brightness-125",
          !minified ? "clip-path-flag left-0 pr-3" : "rounded-b-md left-3"
        )}
      >
        <div className="w-12 h-12 bg-blue-light transition-all flex items-center justify-center rounded-full">
          <Image
            src="/images/logo_spider.svg"
            alt="Back to API Platform website"
            title="Back to API Platform website"
            width="50"
            height="29"
          />
        </div>
      </Link>
      {nav?.backLink && nav.backLink.to !== pathname ? (
        <div className="h-full hidden items-center | lg:flex lg:flex-row">
          <a
            className="uppercase text-white text-xs font-semibold transition-all | hover:text-blue hover:scale-95"
            href={nav.backLink.to.replace("{{locale}}", locale)}
          >
            {`< ${t(nav.backLink.text)}`}
          </a>
          <div className="bg-white w-0.5 h-4/5 ml-4 mr-2" />
        </div>
      ) : null}
      <div className="hidden | lg:block">
        {links?.map((link) => (
          <NavLink key={link.text} to={link.to.replace("{{locale}}", locale)}>
            {t(link.text)}
          </NavLink>
        ))}
      </div>
      {currentEdition === edition ? (
        <BuyButton
          className="hidden md:block md:-translate-x-16 | lg:-translate-x-0"
          size="small"
          id="nav"
        >
          {t("nav.buy_tickets")}
        </BuyButton>
      ) : (
        ""
      )}
    </nav>
  );
}
