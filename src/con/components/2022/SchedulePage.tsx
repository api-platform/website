import React from 'react';
import dayjs from 'dayjs';
import SectionTitle from '@con/components/common/SectionTitle';
import ContactCard from '@con/components/common/ContactCard';
import '@con/styles/index.scss';
import useConferences from '@con/hooks/useConferences';
import extra from '@con/data/2022/extraConferences';
import { Conference } from '@con/types';
import ScheduleDay from './ScheduleDay';

const SchedulePage: React.ComponentType = () => {
  const conferences = useConferences();

  const days = [...conferences, ...(extra as Conference[])].reduce((acc, conference) => {
    if (!acc[conference.date]) {
      acc[conference.date] = [];
    }
    acc[conference.date].push(conference);
    return acc;
  }, {});

  const sortedDays = Object.keys(days).sort((a, b) => {
    const date1 = dayjs(a);
    const date2 = dayjs(b);
    if (date1.isBefore(date2)) return -1;
    if (date1.isAfter(date2)) return 1;
    return 0;
  });

  return (
    <>
      <div className="conf__schedule-page">
        <div className="container">
          <div className="schedule__header">
            <SectionTitle h1 dark>
              Discover the <strong>schedule</strong>
            </SectionTitle>
          </div>
          <div className="schedule-page__content">
            {sortedDays.map((key) => (
              <ScheduleDay key={key} date={key} conferences={days[key]} />
            ))}
          </div>
        </div>
      </div>
      <div className="conf__contact">
        <ContactCard />
      </div>
    </>
  );
};

export default SchedulePage;
