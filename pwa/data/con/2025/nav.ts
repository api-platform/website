const nav = {
  logoLink: "/",
  backLink: {
    to: "/con",
    text: "back_to_current_edition",
  },
  links: [
    {
      to: "/{{locale}}/con/2025/",
      text: "nav.links.home",
      mobileOnly: true,
    },
    {
      to: "/{{locale}}/con/2025/speakers",
      text: "nav.links.speakers",
    },
    {
      to: "/{{locale}}/con/2025/conferences",
      text: "nav.links.conferences",
    },
    {
      to: "/{{locale}}/con/2025/review",
      text: "Review 2025",
    },
    {
      to: "/{{locale}}/con/2025",
      text: "Archive 2025",
    },
  ],
};

export default nav;
