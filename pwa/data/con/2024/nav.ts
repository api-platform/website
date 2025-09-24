const nav = {
  logoLink: "/",
  backLink: {
    to: "/con",
    text: "back_to_current_edition",
  },
  links: [
    {
      to: "/{{locale}}/con/2024/",
      text: "nav.links.home",
      mobileOnly: true,
    },
    {
      to: "/{{locale}}/con/2024/speakers",
      text: "nav.links.speakers",
    },
    {
      to: "/{{locale}}/con/2024/#venue",
      text: "nav.links.venue",
    },
    {
      to: "/{{locale}}/con/2024/schedule",
      text: "nav.links.schedule",
    },
  ],
};

export default nav;
