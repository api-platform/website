import dayjs from 'dayjs';

export const convertTime: (time: string) => string = (time) => dayjs(`2021-09-10T${time}`).format('HH:mm A');

export const isMorningTime: (time: string) => boolean = (time) => 12 >= parseInt(time.split(':')[0], 10);
