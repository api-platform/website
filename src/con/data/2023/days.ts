const days = [
  {
    date: '2022-09-19',
    title: 'Workshop 1',
    tracks: null,
    single: true,
  },
  {
    date: '2022-09-20',
    title: 'Workshop 2',
    tracks: null,
    single: true,
  },
  {
    date: '2022-09-21',
    title: 'Con day 1',
    tracks: ['FR', 'EN'],
    single: false,
  },
  {
    date: '2022-09-22',
    title: 'Con day 2',
    tracks: ['FR', 'EN'],
    single: false,
  },
];

export const getDayByDate = (date) => days.find((day) => day.date === date);

export default days;
