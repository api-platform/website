import { createContext } from "react";

interface EventBriteContextInterface {
  isEventBriteLoaded?: boolean;
}

export const EventBriteContext = createContext<EventBriteContextInterface>({});
