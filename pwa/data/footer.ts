import { FooterPart } from "types";

const footer: FooterPart[] = [
  {
    title: "Resources",
    links: [
      {
        title: "Logos",
        url: "/resources/logos",
      },
      {
        title: "Wallpapers",
        url: "/resources/wallpapers",
      },
      {
        title: "Colouring webby",
        url: "/resources/colouring-webby",
      },
    ],
  },
  {
    title: "Help",
    link: "/help",
    links: [
      {
        title: "Need help?",
        url: "/help",
      },
      {
        title: "Screencasts",
        url: "https://symfonycasts.com/screencast/api-platform?cid=apip",
      },
      {
        title: "Stack Overflow",
        url: "https://stackoverflow.com/questions/tagged/api-platform.com",
      },
      {
        title: "Slack",
        url: "https://symfony-devs.slack.com/",
      },
    ],
  },
  {
    title: "Community",
    link: "/community",
    links: [
      {
        title: "Overview",
        url: "/community",
      },
      {
        title: "Events",
        url: "/events",
      },
      {
        title: "API Platform Conference",
        url: "/con",
      },
      {
        title: "Contributors",
        url: "/community/contributors",
      },
      {
        title: "How to contribute",
        url: "/docs/extra/contribution-guides/",
      },
    ],
  },
];

export default footer;
