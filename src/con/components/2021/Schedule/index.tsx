import React from 'react';
import classNames from 'classnames';
import useConferences from '@con/hooks/useConferences';
import { Conference, Track } from 'src/con/types';
import SectionTitle from '@con/components/common/SectionTitle';
import Section from '@con/components/common/Section';
import TabbedSchedule from './TabbedSchedule';
import FullSchedule from './FullSchedule';

interface ScheduleProps {
  breaks?: Conference[];
  tracks: Track[];
}

const Schedule: React.ComponentType<ScheduleProps> = ({ breaks, tracks }) => {
  const conferences: Conference[] = useConferences();
  return (
    <Section className={classNames('conf__schedule', { empty: 0 === conferences.length })} section="schedule">
      <div className="container">
        <SectionTitle dark>
          Event <strong>schedule</strong>
        </SectionTitle>
        {conferences.length ? (
          <>
            <TabbedSchedule breaks={breaks} conferences={conferences} tracks={tracks} />
            <FullSchedule breaks={breaks} conferences={conferences} tracks={tracks} />
          </>
        ) : (
          <p className="conf__section-subtitle">Come back later to discover the schedule!</p>
        )}
      </div>
    </Section>
  );
};

export default Schedule;
