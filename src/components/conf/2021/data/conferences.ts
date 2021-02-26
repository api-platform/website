import { Conference } from '../types';

const conferences: Conference[] = [
  {
    id: 1,
    speakers: [1, 2],
    title: 'Event Introduction',
    time: ['09:00:00', '09:30:00'],
    speakerTitle: 'event organizers',
    day: 3,
  },
  {
    id: 2,
    speakers: [6],
    title: 'My fight against arachnophobia',
    time: ['09:30:00', '10:30:00'],
    speakerTitle: 'arachnophobic',
    day: 3,
  },
  {
    id: 3,
    speakers: [1],
    title: 'How to become famous during a global pandemic',
    time: ['10:30:00', '12:00:00'],
    day: 3,
  },
  {
    id: 4,
    title: 'Lunch time',
    time: ['12:00:00', '14:00:00'],
    day: 3,
  },
  {
    id: 5,
    speakers: [1, 2],
    title: 'Event Introduction',
    time: ['14:00:00', '15:00:00'],
    speakerTitle: 'event organizers',
    day: 3,
  },
  {
    id: 6,
    speakers: [6],
    title: 'My fight against arachnophobia',
    time: ['15:00:00', '16:00:00'],
    speakerTitle: 'arachnophobic',
    day: 3,
  },
  {
    id: 7,
    speakers: [1],
    title: 'How to become famous during a global pandemic',
    time: ['16:00:00', '18:00:00'],
    day: 3,
  },
];

export default conferences;
