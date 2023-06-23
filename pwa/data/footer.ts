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
        title: "Twitter",
        url: "https://twitter.com/ApiPlatform",
      },
      {
        title: "Github",
        url: "https://github.com/api-platform/api-platform",
      },
      {
        title: "Mastodon",
        url: "https://fosstodon.org/@ApiPlatform",
      },
      {
        title: "Contribute",
        url: "/docs/extra/contribution-guides/",
      },
    ],
  },
];

export default footer;
