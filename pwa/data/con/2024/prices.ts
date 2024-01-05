import { Price } from "types/con";

const prices: Price[] = [
  {
    id: 1,
    title: {
      fr: "Conference",
      en: "Conference",
    },
    languages: {
      fr: "Talks en français et en anglais",
      en: "French and english-speaking talks",
    },
    offers: [
      {
        title: {
          fr: "Ticket 2 jours <br>(Early bird)</br>",
          en: "2 days on-site event <br>(Early bird)</br>",
        },
        price: 129,
        limitDate: "2024-05-12",
      },
      {
        title: {
          fr: "Ticket 2 jours <br>(Regular)</br>",
          en: "2 days on-site event <br>(Regular)</br>",
        },
        price: 169,
        startDate: "2024-05-13",
        limitDate: "2024-07-28",
      },
      {
        title: {
          fr: "Ticket 2 jours <br>(Late bird)</br>",
          en: "2 days on-site event <br>(Late bird)</br>",
        },
        price: 219,
        startDate: "2024-07-29",
      },
      {
        title: {
          fr: "Ticket online",
          en: "Online ticket",
        },
        price: 99,
      },
    ],
  },
];

export default prices;
