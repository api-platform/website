import { getAllEvents } from "api/events";
import EventsPage from "./components/EventsPage";

export default async function Page() {
  const events = await getAllEvents();

  return <EventsPage events={events} />;
}
