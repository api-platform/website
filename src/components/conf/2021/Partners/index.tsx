import React from 'react';
import SectionTitle from '../common/SectionTitle';
import data from '../data/partners';

const Partners: React.ComponentType = () => (
  <div className="conf__partners">
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
            <img loading="lazy" src={`/references/${logo}.png`} alt={name} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Partners;
