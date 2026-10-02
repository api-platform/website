const nav = {
  logoLink: "/",
  backLink: {
    to: "/con",
    text: "back_to_current_edition",
  },
  links: [
    {
      to: "/{{locale}}/con/2026/",
      text: "nav.links.home",
      mobileOnly: true,
    },
    {
      to: "/{{locale}}/con/2026/speakers",
      text: "nav.links.speakers",
    },
    {
      to: "/{{locale}}/con/2026/conferences",
      text: "nav.links.conferences",
    },
    {
      to: "/{{locale}}/con/2026/review",
      text: "Review 2026",
    },
    {
      to: "/{{locale}}/con/2026",
      text: "Archive 2026",
    },
  ],
};

export default nav;
