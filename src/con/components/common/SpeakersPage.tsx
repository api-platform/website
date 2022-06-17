import React from 'react';
import SectionTitle from '@con/components/common/SectionTitle';
import SpeakerList from '@con/components/2021/Speakers/SpeakerList';
import ContactCard from '@con/components/common/ContactCard';
import '@con/styles/index.scss';

const SpeakersPage: React.ComponentType = () => (
  <>
    <div className="conf__speakers-list">
      <div className="container">
        <div className="speakers__header">
          <SectionTitle h1 dark>
            Meet our <strong>speakers</strong>
          </SectionTitle>
          <p className="conf__section-subtitle">
            Join international speakers sharing their knowledge on English and French-speaking tracks.
          </p>
        </div>
        <div className="speakers-list__content">
          <SpeakerList />
        </div>
      </div>
    </div>
    <div className="conf__contact">
      <ContactCard />
    </div>
  </>
);

export default SpeakersPage;
