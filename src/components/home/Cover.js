import React from 'react';
import spider from '../../images/spider_home.svg';
import Flag from './Flag';
import Button from '../common/Button';
import Logo from '../layout/Logo';

const Cover = () => (
  <section className="home__cover full">
    <div className="container cover__content">
      <div className="cover__circle" />
      <div className="cover__spider">
        <img className="spider__image" src={spider} alt="spider" width="256" height="419" />
      </div>
      <Logo className="cover__logo" />
      <h2>REST and GraphQL framework to build modern API-driven projects</h2>
      <div className="cover__buttons">
        <Button
          empty
          text="Download"
          icon="download"
          link="https://github.com/api-platform/api-platform/releases"
        />
        <Button text="Get started" icon="flag" link="/docs/distribution" />
      </div>
    </div>
    <Flag />
  </section>
);

export default Cover;
