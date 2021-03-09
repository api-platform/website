import React from 'react';
import Logo from '../images/logo.svg';
import Button from '../common/Button';
import AnimatedWave from './AnimatedWave';
import Web from './Web';

const Cover: React.ComponentType = () => (
  <div className="conf__cover">
    <div className="container">
      <span className="conf__cover-date">September 10, 2021 - Lille</span>
      <h1 className="conf__cover-logo">
        <img src={Logo} alt="Api Platform Conference" />
      </h1>
      <span className="conf__cover-baseline">The first event dedicated to Api Platform and its ecosystem</span>
      <Button>Buy ticket</Button>
      <Web className="conf__cover-web" />
    </div>
    <AnimatedWave />
  </div>
);

export default Cover;
