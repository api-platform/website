import React from 'react';
import { openSourceData, otherData } from 'data/logos';

const openSourceList = openSourceData.map(({ name, logo, link }) => (
  <a key={name} href={link} target="_blank" rel="noopener noreferrer" className="references__item big">
    <img src={`/references/${logo}.png`} alt={name} width="300" height="300" />
    <p className="logo__title">{name}</p>
  </a>
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
    <img src={`/references/${logo}.png`} alt={name} width="300" height="110" />
  </a>
));

const References = () => (
  <section className="home__part home__references">
    <div className="container references__container">
      <h1 className="references__title">
        They use <strong>API Platform</strong>
      </h1>
      <h4>Open source projects</h4>
      <div className="references__list">{openSourceList}</div>
      <h4>Companies</h4>
      <div className="references__list list__other">{otherList}</div>
    </div>
  </section>
);

export default References;
