import React from 'react';
import Section from '@con/components/common/Section';
import SectionTitle from '@con/components/common/SectionTitle';

const MissingConferences: React.ComponentType = () => {
  return (
    <Section className="py-20 relative overflow-hidden" section="missing">
      <div className="container">
        <SectionTitle dark>
          <strong>Not registered in 2022?</strong>
        </SectionTitle>
        <p className="conf__section-subtitle mb-20 dark">Watch the conference recordings on Youtube!</p>
        <a
          className="my-20 mx-auto conf__button"
          href="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch the conferences
        </a>
      </div>
    </Section>
  );
};

export default MissingConferences;
