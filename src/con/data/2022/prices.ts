import { Price } from '@con/types';

const prices: Price[] = [
  {
    id: 1,
    title: 'Conference',
    languages: 'French and english-speaking tracks',
    offers: [
      {
        title: '2 days on-site event',
        price: 129,
        limitDate: '2022-08-20',
      },
      {
        title: '1-day on-site event',
        price: 89,
        limitDate: '2022-08-20',
      },
      {
        title: '2 days on-site event',
        price: 169,
        startDate: '2022-08-21',
      },
      {
        title: '1-day on-site event',
        price: 109,
        startDate: '2022-08-21',
      },
      {
        title: 'Online ticket',
        price: 59,
      },
    ],
  },
  {
    id: 2,
    title: 'Workshops',
    languages: 'Learn the best of API Platform 3',
    offers: [
      {
        title: 'Workshop API Platform 3',
        price: 500,
      },
      {
        title: 'Workshop DDD',
        price: 500,
      },
      {
        title: '2-days workshops',
        price: 800,
      },
      {
        title: 'Full package: 2 workshops and 2-days conference',
        price: 900,
      },
    ],
  },
];

export default prices;
