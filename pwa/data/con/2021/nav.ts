const nav = {
  logoLink: "/",
  backLink: {
    to: "/{{locale}}/con/",
    text: "nav.backlink",
  },
  links: [
    {
      to: "/{{locale}}/con/2021/",
      text: "nav.links.home",
      mobileOnly: true,
    },
    {
      to: "/{{locale}}/con/2021/speakers",
      text: "nav.links.speakers",
    },
    {
      to: "/{{locale}}/con/2021/schedule",
      text: "nav.links.schedule",
    },
    {
      to: "/{{locale}}/con/2021#venue",
      text: "nav.links.venue",
    },
    {
      to: "/{{locale}}/con/2021/review",
      text: "nav.links.review",
    },
  ],
};

export default nav;
