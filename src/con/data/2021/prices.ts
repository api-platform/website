import { Price } from '@con/types';

const prices: Price[] = [
  {
    id: 1,
    title: 'On-site edition',
    languages: 'French and english-speaking tracks',
    offers: [
      {
        title: 'Early bird',
        limitDate: '2021-04-30',
        price: 69,
      },
      {
        title: 'Regular ticket',
        limitDate: '2021-08-20',
        price: 89,
      },
      {
        title: 'Late bird',
        limitDate: '2021-09-09',
        price: 109,
      },
    ],
  },
  {
    id: 2,
    title: 'Online edition',
    languages: 'English-speaking track',
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
