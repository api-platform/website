import React from 'react';
import { Speaker } from '@con/types';

interface SpeakerSocialListProps {
  speaker: Speaker;
}

const SpeakerSocialList: React.ComponentType<SpeakerSocialListProps> = ({ speaker }) => {
  const { github, twitter } = speaker;
  return (
    <div className="social__list">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <span className="icon-github" />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <span className="icon-twitter" />
        </a>
      )}
    </div>
  );
};

export default SpeakerSocialList;
