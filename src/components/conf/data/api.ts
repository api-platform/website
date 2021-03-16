import { FullConference, Speaker } from '../types';
import speakers from './speakers';

export const conferences = [];

// eslint-disable-next-line import/prefer-default-export
export const getFullConferencesByDay: (day: number) => FullConference[] = (day) => {
  const conferenceList = conferences.filter((conference) => conference.day === day);
  return conferenceList.map((conference) => ({
    ...conference,
    speakers: conference.speakers
      ? conference.speakers.map((speaker) => speakers.find((s) => s.id === speaker))
      : undefined,
  }));
};

export const getConferences = () => conferences;

export const getSpeakerList: () => Speaker[] = () => speakers.filter((speaker) => speaker.list);
