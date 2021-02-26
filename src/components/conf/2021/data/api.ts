import conferences from './conferences';
import speakers from './speakers';

// eslint-disable-next-line import/prefer-default-export
export const getFullConferencesByDay = (day) => {
  const conferenceList = conferences.filter((conference) => conference.day === day);
  return conferenceList.map((conference) => ({
    ...conference,
    speakers: conference.speakers
      ? conference.speakers.map((speaker) => speakers.find((s) => s.id === speaker))
      : undefined,
  }));
};
