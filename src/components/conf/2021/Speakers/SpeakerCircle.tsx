import React from 'react';
import Helmet from 'react-helmet';
import { Speaker } from '../types';
import circle from '../images/circle.svg';

interface SpeakerCircleProps {
  speaker: Speaker;
}

const SpeakerCircle: React.ComponentType<SpeakerCircleProps> = ({ speaker }) => {
  const { image, name, job, github, twitter } = speaker;
  return (
    <div className="conf__speaker-circle">
      <Helmet>
        <script type="application/ld+json">{`
    {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": "${speaker.name}",
      "jobTitle": "${speaker.job}"
    }
  `}</script>
      </Helmet>
      <div className="hoverable">
        <img className="circle__effect" src={circle} alt="effect" />
        <div className="circle">
          <img className="circle__picture" src={image} alt={name} />
          <svg className="circle__plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.49 281.49">
            <path d="M140.74,0C63.14,0,0,63.14,0,140.74S63.14,281.49,140.74,281.49s140.75-63.14,140.75-140.75S218.35,0,140.74,0Zm0,263.49A122.75,122.75,0,1,1,263.49,140.74,122.88,122.88,0,0,1,140.74,263.49Z" />
            <path d="M210.91,131.74H149.74V70.58a9,9,0,1,0-18,0v61.16H70.58a9,9,0,1,0,0,18h61.16v61.17a9,9,0,0,0,18,0V149.74h61.17a9,9,0,0,0,0-18Z" />
          </svg>
        </div>
        <div className="infos">
          <span className="overline">{job}</span>
          <h3 className="h5 lined">{name}</h3>
        </div>
      </div>
      <div className="speaker__social">
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
    </div>
  );
};

export default SpeakerCircle;
