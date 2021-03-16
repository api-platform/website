import { Price } from '../types';

const prices: Price[] = [
  {
    id: 1,
    title: 'Early bird',
    limitDate: '2021-07-15',
    offers: [
      {
        title: 'Conference + workshop',
        price: 318,
      },
      {
        title: 'Conference only',
        price: 49,
      },
      {
        title: 'Workshop only',
        price: 279,
      },
    ],
  },
  {
    id: 2,
    title: 'Regular',
    limitDate: '2021-09-08',
    offers: [
      {
        title: 'Conference + workshop',
        price: 318,
      },
      {
        title: 'Conference only',
        price: 49,
      },
      {
        title: 'Workshop only',
        price: 279,
      },
    ],
  },
  {
    id: 3,
    title: 'Late bird',
    limitDate: '2021-09-10',
    offers: [
      {
        title: 'Conference only',
        price: 49,
      },
    ],
  },
];

export default prices;
