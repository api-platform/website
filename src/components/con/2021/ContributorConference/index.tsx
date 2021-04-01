import React from 'react';
import { Link } from 'gatsby';
import { Conference } from '../types';
import Logo from '../images/logo.svg';
import Web from '../Cover/Web';
import useSpeaker from '../hooks/useSpeaker';

const ContributorConference: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
  const speaker = useSpeaker(conference.speaker);
  return (
    <Link to={conference.slug} className="contributor__conference card clickable">
      <Web className="web" />
      <div className="conference__content">
        <img src={Logo} alt="Api Platform Conference" width="200" height="80" />
        <span className="conference__title lined">{conference.title}</span>
        <p className="conference__speaker h6">{speaker.name}</p>
      </div>
    </Link>
  );
};

export default ContributorConference;
