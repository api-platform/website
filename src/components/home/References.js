import React from 'react';
import { openSourceData, otherData } from '../../data/logos';

const openSourceList = openSourceData.map(({ name, logo, link }) => (
  <div key={name} className="list__item">
    <a href={link} target="_blank" rel="noopener noreferrer" className="references__item big card clickable">
      <div className="item__image">
        <img src={`/references/${logo}.png`} alt={name} />
      </div>
      <p className="logo__title">{name}</p>
    </a>
  </div>
));

const otherList = otherData.map(({ name, logo, link }) => (
  <a
    href={link}
    title={`${name} (new window)`}
    key={name}
    target="_blank"
    rel="nofollow noreferrer noopener"
    className="references__item"
  >
    <img src={`/references/${logo}.png`} alt={name} />
  </a>
));

const References = () => (
  <section className="home__part home__references">
    <div className="container references__container">
      <h2 className="h1-like references__title">
        They use <strong>API Platform</strong>
      </h2>
      <h3 className="references__subtitle h4-like">Open source projects</h3>
      <div className="references__list">{openSourceList}</div>
      <h3 className="references__subtitle h4-like">Companies</h3>
      <div className="references__list list__other">{otherList}</div>
    </div>
  </section>
);

export default References;
