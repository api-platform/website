import React from 'react';
import Section from '@con/components/common/Section';
import SectionTitle from '@con/components/common/SectionTitle';
import { Link } from 'gatsby';

const MissingConferences: React.ComponentType = () => {
  return (
    <Section className="py-20 relative overflow-hidden" section="missing">
      <div className="container">
        <SectionTitle dark>
          <strong>What happened last year?</strong>
        </SectionTitle>
        <p className="conf__section-subtitle dark mb-0">
          Watch the conference recordings on Youtube and find more information on{' '}
          <Link className="text-white" to="/con/2022/review">
            our review
          </Link>
          !
        </p>
        <a
          className="mt-30 mx-auto conf__button"
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
