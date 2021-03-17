import React from 'react';
import classNames from 'classnames';
import SectionTitle from '../common/SectionTitle';
import TabbedSchedule from './TabbedSchedule';
import FullSchedule from './FullSchedule';
import Section from '../common/Section';
import { getConferences } from '../data/api';

const Schedule: React.ComponentType = () => {
  const conferences = getConferences();
  return (
    <>
      <Section className={classNames('conf__schedule', { empty: 0 === conferences.length })} section="schedule">
        <div className="container">
          <SectionTitle dark>
            Event <strong>schedule</strong>
          </SectionTitle>
          {conferences.length ? (
            <>
              <TabbedSchedule />
              <FullSchedule />
            </>
          ) : (
            <p className="conf__section-subtitle">Come back later to discover the schedule!</p>
          )}
        </div>
      </Section>
    </>
  );
};

export default Schedule;
