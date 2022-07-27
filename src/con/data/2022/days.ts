const days = [
  {
    date: '2022-09-13',
    title: 'Workshop 1',
    tracks: null,
    single: true,
  },
  {
    date: '2022-09-14',
    title: 'Workshop 2',
    tracks: null,
    single: true,
  },
  {
    date: '2022-09-15',
    title: 'Con day 1',
    tracks: ['FR', 'EN'],
    single: false,
  },
  {
    date: '2022-09-16',
    title: 'Con day 2',
    tracks: ['FR', 'EN'],
    single: false,
  },
  {
    date: '2022-09-17',
    title: 'Hack day',
    tracks: null,
    single: true,
  },
];

export const getDayByDate = (date) => days.find((day) => day.date === date);

export default days;
