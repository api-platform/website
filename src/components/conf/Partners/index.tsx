import React from 'react';
import SectionTitle from '../common/SectionTitle';
import data from '../data/partners';
import Section from '../layout/Section';

const Partners: React.ComponentType = () => (
  <Section className="conf__partners" section="partners">
    <div className="container">
      <SectionTitle>
        Our <strong>partners</strong>
      </SectionTitle>
      <div className="partners__grid">
        {data.map(({ name, logo, link }) => (
          <a
            href={link}
            title={`${name} (new window)`}
            key={name}
            target="_blank"
            rel="nofollow noreferrer noopener"
            className="partners__item"
          >
            <img width="300" height="110" loading="lazy" src={`/conf/partners/${logo}.png`} alt={name} />
          </a>
        ))}
      </div>
    </div>
  </Section>
);

export default Partners;
