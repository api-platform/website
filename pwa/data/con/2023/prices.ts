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
        price: 119,
        limitDate: "2023-04-24",
      },
      {
        title: {
          fr: "Ticket 2 jours <br>(Regular)</br>",
          en: "2 days on-site event <br>(Regular)</br>",
        },
        price: 159,
        startDate: "2023-04-25",
        limitDate: "2023-07-26",
      },
      {
        title: {
          fr: "Ticket 2 jours <br>(Late bird)</br>",
          en: "2 days on-site event <br>(Late bird)</br>",
        },
        price: 209,
        startDate: "2023-07-27",
      },
      {
        title: {
          fr: "Ticket online",
          en: "Online ticket",
        },
        price: 89,
      },
    ],
  },
  {
    id: 2,
    title: {
      fr: "Workshops",
      en: "Workshops",
    },
    languages: {
      fr: "Apprenez le meilleur d'API Platform",
      en: "Learn the best of API Platform",
    },
    offers: [
      {
        title: {
          fr: "1 workshop",
          en: "1 workshop",
        },
        price: 499,
      },
      {
        title: {
          en: "COMBO 2 workshops",
          fr: "COMBO 2 workshops",
        },
        price: 799,
      },
      {
        title: {
          en: "Combo 2 workshops and 2 days conference",
          fr: "Combo 2 workshops et 2 jours de conférence",
        },
        price: 899,
      },
    ],
  },
];

export default prices;
