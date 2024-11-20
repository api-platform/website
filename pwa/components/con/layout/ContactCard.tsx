"use client";
import React, { useContext } from "react";
import useAnimation from "hooks/con/useAnimation";
import { LanguageContext } from "contexts/con/LanguageContext";

interface ContactIconProps {
  url: string;
  icon: string;
}

function ContactIcon({ url, icon }: ContactIconProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${icon}`}
      className="text-white border-2 border-white bg-[position:0] bg-[length:300%] bg-icon-white transition-all ease-in-out p-2 rounded-full w-9 h-9 inline-flex items-center justify-center m-1 hover:text-blue-dark hover:bg-[position:100%]"
    >
      <i className={`icon-${icon}`} />
    </a>
  );
}

export default function ContactCard() {
  const { t } = useContext(LanguageContext);
  const animationContact = useAnimation("scale", 0.5, 1.5);
  return (
    <div ref={animationContact} className="z-20 relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-gradient bg-blue shadow-xl mx-auto w-11/12 max-w-xl text-white top-0">
        <div className="dotted-corner w-full h-full p-4 flex flex-row items-center after:absolute after:w-[calc(100%-36px)] after:h-[calc(100%-36px)] after:border-2 after:border-blue-light after:border-dotted after:left-1/2 after:top-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:pointer-events-none">
          <div className="w-1/3 relative z-10 -translate-y-1 hidden sm:block">
            <img
              src="/images/con/spider_contact.svg"
              alt="spider"
              width="168"
              height="200"
              className="h-52 mx-auto"
            />
          </div>
          <div className="flex-1 flex flex-col items-center px-3 py-4">
            <span className="uppercase text-2xl  font-bold font-title | sm:text-3xl">
              {t("have_questions")}
            </span>
            <a
              className="btn small square white my-4"
              href="mailto:events@les-tilleuls.coop"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact_us")}
            </a>
            <p className="text-blue-darkest uppercase text-sm font-semibold">
              {t("or_follow_us")}
            </p>
            <div className="social__list white">
              <ContactIcon
                url="https://bsky.app/profile/les-tilleuls.coop"
                icon="bluesky"
              />
              <ContactIcon
                url="https://twitter.com/ApiPlatform"
                icon="twitter"
              />
              <ContactIcon
                url="https://fr.linkedin.com/company/les-tilleuls-coop"
                icon="linkedin"
              />
              <ContactIcon
                url="https://mastodon.online/@cooptilleuls"
                icon="mastodon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
