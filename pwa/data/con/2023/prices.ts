import { Price } from "types/con";

const prices: Price[] = [
  {
    id: 1,
    title: "Conference",
    languages: "pricing.conference.subtitle",
    offers: [
      {
        title: "pricing.conference.offers.on_site_early",
        price: 119,
        limitDate: "2023-04-29",
      },
      {
        title: "pricing.conference.offers.on_site",
        price: 159,
        startDate: "2023-04-30",
        limitDate: "2023-07-31",
      },
      {
        title: "pricing.conference.offers.on_site",
        price: 209,
        startDate: "2023-08-01",
      },
      {
        title: "pricing.conference.offers.online_tickets",
        price: 89,
      },
    ],
  },
  {
    id: 2,
    title: "Workshops",
    languages: "pricing.workshop.subtitle",
    offers: [
      {
        title: "pricing.workshop.offers.one_day",
        price: 499,
      },
      {
        title: "pricing.workshop.offers.two_days",
        price: 799,
      },
      {
        title: "pricing.workshop.offers.full_package",
        price: 899,
      },
    ],
  },
];

export default prices;
