import React from 'react';
import { Link } from 'gatsby';
import Web from '@con/common/Web';
import { Conference } from '../types';
import Logo from '../images/logo.svg';
import useSpeakers from '../hooks/useSpeakers';

const ContributorConference: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
  const speakers = useSpeakers(conference.speakers);
  const speakersName = speakers.map((speaker) => speaker.name).join(' & ');

  return (
    <Link to={conference.slug} className="contributor__conference card clickable">
      <Web className="web" />
      <div className="conference__content">
        <img src={Logo} alt="Api Platform Conference" width="200" height="80" />
        <span className="conference__title lined">{conference.title}</span>
        <p className="conference__speaker h6">{speakersName}</p>
      </div>
    </Link>
  );
};

export default ContributorConference;
