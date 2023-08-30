import { getAllEvents } from "api/events";
import EventsPage from "./components/EventsPage";
import { Metadata } from "next";
import OGImage from "../../../public/images/opengraph-image.png";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["events"].title,
    description: dictionary["events"].description,
    openGraph: {
      url: "https://api-platform.com",
      type: "website",
      title: dictionary["events"].title,
      description: dictionary["events"].description,
      images: [
        {
          url: OGImage.src,
          width: 1200,
          height: 630,
          alt: "API Platform logo",
        },
      ],
    },
    twitter: {
      title: dictionary["events"].title,
      description: dictionary["events"].description,
    },
  };
}

export default async function Page() {
  const events = await getAllEvents();

  return <EventsPage events={events} />;
}
