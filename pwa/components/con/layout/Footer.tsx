"use client";
import Wave from "components/con/common/Wave";
import React, { useContext } from "react";
import LogoTilleuls from "components/con/common/LogoTilleuls";
import { getPreviousEdition } from "data/con/editions";
import { FooterColumn } from "types/con";
import ConLink from "../common/ConLink";
import { LanguageContext } from "contexts/con/LanguageContext";
import LangSwitcher from "components/con/common/LangSwitcher";

interface FooterProps {
  links?: FooterColumn[];
  withSocial?: boolean;
  edition?: string;
}

export default function Footer({
  links,
  withSocial = false,
  edition = "",
}: FooterProps) {
  const { t, locale } = useContext(LanguageContext);
  return (
    <div className="text-white w-full relative overflow-hidden">
      <div className="container flex flex-col min-h-[500px] pt-48 z-10">
        <div className="flex flex-col items-center mt-16 p-5 flex-wrap w-full | lg:flex-row lg:items-start lg:gap-16">
          <div className="flex items-center justify-center flex-col mb-5 | lg:mb-0 lg:mr-auto ">
            <img
              src="/images/con/logo.svg"
              alt="Api Platform Conference"
              width="250"
              height="54"
            />
            <span className="pt-5">{t("an_event_by")}</span>
            <a
              className="text-center w-52"
              href={`https://les-tilleuls.coop/${locale}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <LogoTilleuls width="100%" />
            </a>
          </div>
          {links?.map((column) => (
            <div
              key={column.title}
              className="grid grid-cols-1 gap-y-1.5 justify-center items-center text-center p-7 text-sm | lg:p-0 lg:items-start lg:text-left"
            >
              <span className="mb-1 text-base font-bold uppercase">
                {t(column.title)}
              </span>
              {column.links.map(({ link, title }) => (
                <div
                  key={title}
                  className="transition-all hover:text-blue font-semibold"
                >
                  <ConLink href={link}>
                    {t(title, {
                      previous_edition: getPreviousEdition(edition),
                    })}
                  </ConLink>
                </div>
              ))}
            </div>
          ))}

          {withSocial ? (
            <div className="grid grid-cols-1 gap-y-1.5 justify-center items-center text-center p-7 text-sm | lg:p-0 lg:items-start lg:text-left">
              <span className="text-base font-bold uppercase mb-1">
                {t("follow_us")}
              </span>
              <a
                href="https://twitter.com/ApiPlatform"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:text-blue"
              >
                <i className="icon-twitter mr-2" />
                <span>Twitter</span>
              </a>
              <a
                href="https://bsky.app/profile/api-platform.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:text-blue"
              >
                <i className="icon-mastodon mr-2" />
                <span>Bluesky</span>
              </a>
              <a
                href="https://fr.linkedin.com/company/les-tilleuls-coop"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:text-blue"
              >
                <i className="icon-linkedin mr-2" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://mastodon.online/@cooptilleuls"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:text-blue"
              >
                <i className="icon-mastodon mr-2" />
                <span>Mastodon</span>
              </a>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end pr-12">
          <LangSwitcher locale={locale} />
        </div>
        <hr className="border-1 border-blue w-full" />

        <span className="text-sm font-light text-center my-5">
          Copyright © 2024{" "}
          <a
            href={`https://les-tilleuls.coop/${locale}`}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold"
          >
            Les-Tilleuls.coop
          </a>
        </span>
      </div>
      <Wave className="absolute w-[1200px] max-w-7xl -top-28 left-1/2 -translate-x-1/2 opacity-50 | xl:w-full" />
    </div>
  );
}
