import { Price } from '@con/types';

const prices: Price[] = [
  {
    id: 1,
    title: 'Conference',
    languages: 'French and english-speaking talks',
    offers: [
      {
        title: '2 days on-site event <br>(Early bird)</br>',
        price: 119,
        limitDate: '2023-04-24',
      },
      {
        title: '2 days on-site event <br>(Regular)</br>',
        price: 159,
        startDate: '2023-04-25',
        limitDate: '2023-07-31',
      },
      {
        title: '2 days on-site event <br>(Late bird)</br>',
        price: 209,
        startDate: '2023-08-01',
      },
      {
        title: 'Online ticket',
        price: 89,
      },
    ],
  },
  {
    id: 2,
    title: 'Workshops',
    languages: 'Learn the best of API Platform',
    offers: [
      {
        title: '1 workshop',
        price: 499,
      },
      {
        title: 'Combo 3 workshops',
        price: 1199,
      },
      {
        title: 'Combo 3 workshops and 2 days conference',
        price: 1299,
      },
    ],
  },
];

export default prices;
