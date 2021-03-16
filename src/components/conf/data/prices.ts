import { Price } from '../types';

const prices: Price[] = [
  {
    id: 1,
    title: 'Physical edition',
    offers: [
      {
        title: 'Early bird',
        limitDate: '2021-04-30',
        price: 69,
      },
      {
        title: 'Regular ticket',
        limitDate: '2021-08-20',
        price: 79,
      },
      {
        title: 'Late bird',
        limitDate: '2021-09-08',
        price: 109,
      },
    ],
  },
  {
    id: 2,
    title: 'Online edition',
    offers: [
      {
        title: 'Online ticket',
        limitDate: '2021-09-08',
        price: 39,
      },
    ],
  },
];

export default prices;
