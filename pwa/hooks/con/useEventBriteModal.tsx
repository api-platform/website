"use client";
import { useEffect, useContext, useState } from "react";
import { EventBriteContext } from "contexts/con/EventBriteContext";

const useEventBriteModal: (id: string) => void = (id) => {
  const { isEventBriteLoaded } = useContext(EventBriteContext);
  const [isWidgetCreated, setIsWidgetCreated] = useState(false);

  useEffect(() => {
    if (isEventBriteLoaded && !isWidgetCreated) {
      // @ts-expect-error eventbrite widget
      window.EBWidgets?.createWidget({
        widgetType: "checkout",
        eventId: process.env.NEXT_PUBLIC_EVENT_BRITE_ID,
        modal: true,
        modalTriggerElementId: id,
      });
      setIsWidgetCreated(true);
    }
  }, [isEventBriteLoaded, id, isWidgetCreated, setIsWidgetCreated]);
};

export default useEventBriteModal;
