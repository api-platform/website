import React, { useContext } from 'react';
import Web from '@con/common/Web';
import Wave from '@con/common/Wave';
import Button from '@con/common/Button';
import Logo from '../images/logo.svg';
import Section, { SectionContext } from '../common/Section';

const CoverWeb: React.ComponentType = () => {
  const isVisible = useContext(SectionContext);
  return <Web className="conf__cover-web" animated isVisible={isVisible} />;
};

const Cover: React.ComponentType = () => (
  <Section className="conf__cover" section="home">
    <div className="container">
      <span className="conf__cover-date">September 10, 2021 - Lille & online</span>
      <h1 className="conf__cover-logo">
        <img src={Logo} alt="Api Platform Conference" width="800" height="172" />
      </h1>
      <span className="conf__cover-baseline">
        The first international conference dedicated to API Platform and its ecosystem
      </span>
      <CoverWeb />
      <Button to="/con">{`< Back to current edition`}</Button>
    </div>
    <Wave className="conf__cover-wave" animated={false} />
  </Section>
);

export default Cover;
