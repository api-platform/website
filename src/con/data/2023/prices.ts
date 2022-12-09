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
        limitDate: '2023-05-14',
      },
      {
        title: '2 days on-site event',
        price: 159,
        startDate: '2023-05-15',
        limitDate: '2023-07-31',
      },
      {
        title: '2 days on-site event',
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
        title: '1-day workshop',
        price: 499,
      },
      {
        title: '2-days workshops',
        price: 799,
      },
      {
        title: 'Full package: 2 workshops and 2-days conference',
        price: 899,
      },
    ],
  },
];

export default prices;
