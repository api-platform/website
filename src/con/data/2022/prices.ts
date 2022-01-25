import { Price } from '@con/types';

const prices: Price[] = [
  {
    id: 1,
    title: 'On-site edition',
    languages: 'French and english-speaking tracks',
    offers: [
      {
        title: 'Early bird',
        limitDate: '2022-05-06',
        price: 89,
      },
      {
        title: 'Regular ticket',
        limitDate: '2022-08-19',
        price: 129,
      },
      {
        title: 'Late bird',
        limitDate: '2022-09-14',
        price: 169,
      },
    ],
  },
  {
    id: 2,
    title: 'Online edition',
    languages: 'French and english-speaking tracks',
    offers: [
      {
        title: 'Online ticket',
        limitDate: '2022-09-13',
        price: 59,
      },
    ],
  },
];

export default prices;
