import React, { useContext } from "react";
import Web from "components/con/common/Web";
import Wave from "components/con/common/Wave";
import Section, { SectionsContext } from "components/con/home/Section";

interface CoverProps {
  date: string;
  baseline: string;
  button?: JSX.Element;
}

export default function Cover({ date, baseline, button }: CoverProps) {
  const { isVisible } = useContext(SectionsContext);
  return (
    <Section
      className="flex flex-col text-white text-center justify-center items-center min-h-screen w-full relative overflow-hidden pt-12 pb-12"
      section="home"
    >
      <div className="container relative z-10 flex flex-col items-center">
        <span className="inline-block uppercase border-2 border-white py-3 px-4 font-semibold text-xs mb-10 | sm:text-sm | md:text-base">
          {date}
        </span>
        <h1>
          <img
            src="/images/con/logo.svg"
            alt="API Platform Conference"
            width="800"
            height="172"
          />
        </h1>
        <span className="text-3xl font-light py-12">{baseline}</span>
        <Web
          className="absolute max-w-none z-0 h-screen -translate-x-1/2 -translate-y-1/2 top-1/2 left-[80%] opacity-60 pointer-events-none"
          animated={true}
          isVisible={isVisible("home")}
        />
        {button || null}
      </div>
      <Wave className="absolute opacity-50 z-0 bottom-0 max-w-none h-[60vh] right-[24%] top-[58%] -translate-y-1/2 rotate-[10deg]" />
    </Section>
  );
}
