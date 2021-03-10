import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TabbedSchedule from './TabbedSchedule';
import FullSchedule from './FullSchedule';
import Section from '../layout/Section';

const Schedule: React.ComponentType = () => {
  return (
    <Section className="conf__schedule" section="schedule">
      <div className="container">
        <SectionTitle dark>
          Event <strong>schedule</strong>
        </SectionTitle>
        <TabbedSchedule />
        <FullSchedule />
      </div>
    </Section>
  );
};

export default Schedule;
