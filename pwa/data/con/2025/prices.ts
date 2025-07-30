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
        type: "Early Bird",
        title: {
          fr: "Ticket 2 jours <br>(Early bird)</br>",
          en: "2 days on-site event <br>(Early bird)</br>",
        },
        price: 139,
        limitDate: "2025-05-11",
      },
      {
        type: "Regular",
        title: {
          fr: "Ticket 2 jours <br>(Regular)</br>",
          en: "2 days on-site event <br>(Regular)</br>",
        },
        price: 179,
        startDate: "2025-05-12",
        limitDate: "2025-07-29",
      },
      {
        type: "Late bird",
        title: {
          fr: "Ticket 2 jours <br>(Late bird)</br>",
          en: "2 days on-site event <br>(Late bird)</br>",
        },
        price: 239,
        startDate: "2025-07-30",
        limitDate: "2025-09-19",
      },
      {
        title: {
          fr: "Ticket online",
          en: "Online ticket",
        },
        price: 105,
      },
    ],
  },
];

export default prices;
