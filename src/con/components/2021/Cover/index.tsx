import React, { useContext } from 'react';
import Web from '@con/components/common/Web';
import Wave from '@con/components/common/Wave';
import Section, { SectionContext } from '@con/components/common/Section';
import Logo from '@con/images/logo.svg';

const CoverWeb: React.ComponentType = () => {
  const isVisible = useContext(SectionContext);
  return <Web className="conf__cover-web" animated isVisible={isVisible} />;
};

interface CoverProps {
  date: string;
  baseline: string;
  button?: JSX.Element;
}

const Cover: React.ComponentType<CoverProps> = ({ date, baseline, button }) => (
  <Section className="conf__cover" section="home">
    <div className="container">
      <span className="conf__cover-date">{date}</span>
      <h1 className="conf__cover-logo">
        <img src={Logo} alt="Api Platform Conference" width="800" height="172" />
      </h1>
      <span className="conf__cover-baseline">{baseline}</span>
      <CoverWeb />
      {button || null}
    </div>
    <Wave className="conf__cover-wave" animated={false} />
  </Section>
);

export default Cover;
