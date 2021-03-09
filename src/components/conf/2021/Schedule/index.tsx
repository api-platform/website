import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TabbedSchedule from './TabbedSchedule';
import FullSchedule from './FullSchedule';

const Schedule: React.ComponentType = () => {
  return (
    <div className="conf__schedule">
      <div className="container">
        <SectionTitle dark>
          Event <strong>schedule</strong>
        </SectionTitle>
        <TabbedSchedule />
        <FullSchedule />
      </div>
    </div>
  );
};

export default Schedule;
