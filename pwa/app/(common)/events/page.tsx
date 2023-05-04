import { getAllEvents } from "api/events";
import EventsPage from "./components/EventsPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["events"].title,
    description: dictionary["events"].description,
  };
}

export default async function Page() {
  const events = await getAllEvents();

  return <EventsPage events={events} />;
}
