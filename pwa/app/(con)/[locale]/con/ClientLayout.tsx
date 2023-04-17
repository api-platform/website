"use client";
import { useContext, useState } from "react";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Script from "next/script";
import { SectionsContext } from "components/con/home/Section";
import { EventBriteContext } from "contexts/con/EventBriteContext";
import dayjs from "dayjs";
import { LanguageContext } from "contexts/con/LanguageContext";

export default function ConLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { locale } = useContext(LanguageContext);
  const [sectionsVisibles, setSectionsVisibles] = useState<string[]>([]);
  const isVisible = (section: string) => sectionsVisibles.includes(section);

  const [isEventBriteLoaded, setIsEventBriteLoaded] = useState(false);

  dayjs.extend(localizedFormat);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.locale(locale);

  return (
    <div id="conf" className="overflow-x-clip">
      <Script
        src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
        onLoad={() => {
          setIsEventBriteLoaded(true);
        }}
      />
      <div className="fixed z-0 h-screen w-full bg-conf-gradient bg-blue-black pointer-events-none" />
      <EventBriteContext.Provider value={{ isEventBriteLoaded }}>
        <SectionsContext.Provider
          value={{ sectionsVisibles, setSectionsVisibles, isVisible }}
        >
          {children}
        </SectionsContext.Provider>
      </EventBriteContext.Provider>
    </div>
  );
}
