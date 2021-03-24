import { FullConference, Speaker, Track } from '../types';
import speakers from './speakers';
import tracks from './tracks';

export const conferences = [];

// eslint-disable-next-line import/prefer-default-export
export const getFullConferencesByTrack: (track: number) => FullConference[] = (track) => {
  const conferenceList = conferences.filter((conference) => conference.track === track);
  return conferenceList.map((conference) => ({
    ...conference,
    speakers: conference.speakers
      ? conference.speakers.map((speaker) => speakers.find((s) => s.id === speaker))
      : undefined,
  }));
};

export const getConferences = () => conferences;

export const getSpeaker: (id: string) => Speaker | undefined = (id) => speakers.find((speaker) => speaker.id === id);

export const getTrack: (index: number) => Track | undefined = (index) => tracks.find((track) => track.index === index);

export const getSpeakerList: () => Speaker[] = () => speakers.filter((speaker) => speaker.list);
