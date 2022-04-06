import dayjs from 'dayjs';
import { Conference } from './types';

export const sortByStartDate: (conference1: Conference, conference2: Conference) => 1 | -1 | 0 = (
  conference1,
  conference2
) => {
  const date1 = conference1.start ? dayjs(`2021-09-10T${conference1.start}`) : dayjs();
  const date2 = conference2.start ? dayjs(`2021-09-10T${conference2.start}`) : dayjs();
  if (date1.isBefore(date2)) return -1;
  if (date1.isAfter(date2)) return 1;
  return 0;
};

export const convertTime: (time: string) => string = (time) => dayjs(`2021-09-10T${time}`).format('HH:mm A');

export const isMorningTime: (time: string) => boolean = (time) => 12 >= parseInt(time.split(':')[0], 10);
