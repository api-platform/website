import { getContributors } from "api/contributors";
import { getAllEvents } from "api/events";
import { Event } from "types";
import Heading from "components/common/typography/Heading";
import EventCard from "../events/components/EventCard";
import ArrowLink from "components/common/ArrowLink";
import Button from "components/common/Button";
import RandomContributors from "./components/RandomContributors";
import ShapeSection from "components/common/ShapeSection";
import Image from "next/image";
import Card from "components/common/Card";
import classNames from "classnames";
import { Metadata } from "next";

const socials = [
  {
    link: "https://stackoverflow.com/questions/tagged/api-platform.com",
    title: "Stack Overflow",
    image: "stack-overflow",
    text: "Ask questions about API Platform to the stack overflow community",
  },
  {
    link: "https://symfony-devs.slack.com/",
    title: "Slack",
    image: "slack",
    text: "Chat with the community on the api-platform channel on Symfony's Slack",
  },
  {
    link: "https://fosstodon.org/@ApiPlatform",
    title: "Mastodon",
    image: "mastodon",
    text: "Connect with your local community on Mastodon",
  },
  {
    link: "https://twitter.com/intent/tweet?screen_name=ApiPlatform&original_referer=https://api-platform.com/community",
    title: "Twitter",
    image: "twitter",
    text: "Connect with your local community on Twitter",
  },
  {
    link: "https://github.com/api-platform/api-platform/issues",
    title: "Github",
    image: "github",
    text: "Report issues, help fix bugs or implement new features by creating a PR on GitHub.",
    invert: true,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["community"].title,
    description: dictionary["community"].description,
    openGraph: {
      title: dictionary["community"].title,
      description: dictionary["community"].description,
    },
    twitter: {
      title: dictionary["community"].title,
      description: dictionary["community"].description,
    },
  };
}

function SocialItem({
  image,
  link,
  title,
  text,
  invert,
}: {
  image: string;
  link: string;
  title: string;
  text: string;
  invert?: boolean;
}) {
  return (
    <Card
      externalLink={link}
      padding
      className="flex flex-row items-center justify-center w-full gap-8"
    >
      <div className="h-16 aspect-square relative p-2">
        <Image
          alt=""
          src={`/images/social/${image}.svg`}
          width={150}
          height={150}
          className={classNames(
            "w-full h-full object-contain",
            invert && "dark:invert"
          )}
        />
      </div>
      <div className="flex flex-col h-full w-full pt-2">
        <Heading level="p" size="xs" className="mb-4">
          {title}
        </Heading>
        <p className="text text-secondary text-sm font-light flex-1">{text}</p>
        <ArrowLink
          size="small"
          href="/events"
          text={`Go to ${title}`}
          className="w-fit ml-auto mt-4 hidden lg:block"
        />
      </div>
    </Card>
  );
}

export default async function Page() {
  const events = (await getAllEvents()).splice(0, 2);
  const contributors = await getContributors(1, 70);

  return (
    <div>
      <ShapeSection
        className="bg-blue-black h-[75vh] z-10"
        effect="right-triangle"
        maskColor="gray-100"
        darkModeColor="blue-black"
      >
        <div className="absolute left-0 top-0 w-full h-full opacity-70 z-0">
          <Image
            src="/images/community_cover.png"
            fill
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="container relative z-10 py-24 text-white flex flex-col justify-center min-h-full">
          <Heading size="xl" level="h1" className="pt-8">
            Our <strong>community</strong>
          </Heading>
          <p className="mt-2 font-light text-lg max-w-xl">
            Interested in contributing to API Platform and supporting our
            community? Then you&apos;re in the good place! There are many ways
            to get involved and help us.
          </p>
        </div>
      </ShapeSection>
      <section className="bg-gray-100 dark:bg-blue-black -mb-12">
        <div className="container relative z-20">
          <div className="-translate-y-24 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
            {socials.map((social) => (
              <SocialItem key={social.title} {...social} />
            ))}
          </div>
        </div>
      </section>
      <ShapeSection
        className="bg-white dark:bg-blue-black pb-20 z-20"
        effect="left-triangle"
        maskColor="gray-100"
        darkModeColor="blue-darkest"
      >
        <div className="container py-6 text-center">
          <Heading size="lg" level="h2">
            Our contributors
          </Heading>
          <p className=" text-text-secondary mb-8">
            Many volunteers contribute back to API Platform. Here are some of
            them picked randomly:
          </p>
          <RandomContributors contributors={contributors} />
          <Button className="my-4" href="/community/contributors">
            See all our contributors
          </Button>
        </div>
      </ShapeSection>
      <div className="bg-gray-100 dark:bg-blue-darkest pb-12">
        <div className="container relative py-6">
          <Heading size="lg" level="h2">
            Our events
          </Heading>
          <div className="grid grid-cols-1 my-4 place-content-center lg:grid-cols-2 gap-4 sm:gap-6">
            {events.map((event: Event) => (
              <EventCard key={event.link} event={event} />
            ))}
          </div>
          <ArrowLink
            href="/events"
            text="Discover all our events"
            className="w-fit ml-auto"
          />
        </div>
      </div>
    </div>
  );
}
