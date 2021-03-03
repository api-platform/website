import React, { useState, useMemo, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import SectionTitle from '../common/SectionTitle';
import DaySelector from './DaySelector';
import SlotItem from './SlotItem';
import { getFullConferencesByDay } from '../data/api';
import { FullConference } from '../types/index';
import Button from '../common/Button';

const Schedule: React.ComponentType = () => {
  const [selectedDay, setSelectedDay] = useState(3);
  const [selectedMomentDay, setSelectedMomentDay] = useState(0);

  const conferences: FullConference[] = useMemo(() => getFullConferencesByDay(selectedDay), [selectedDay]);
  const morningConferences = useMemo(
    () => conferences.filter((conference) => 12 >= parseInt(conference.time?.[0].split(':')[0], 10)),
    [conferences]
  );
  const afternoonConferences = useMemo(
    () => conferences.filter((conference) => 12 < parseInt(conference.time?.[0].split(':')[0], 10)),
    [conferences]
  );

  const handleChangeIndex = (index: 0 | 1) => {
    setSelectedMomentDay(index);
  };

  useEffect(() => handleChangeIndex(0), [selectedDay]);

  return (
    <div className="conf__schedule">
      <div className="container">
        <SectionTitle dark>
          Event <strong>schedule</strong>
        </SectionTitle>
        <div className="conf__schedule-content">
          <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <div className="schedule__program">
            <SwipeableViews key={selectedDay} index={selectedMomentDay} onChangeIndex={handleChangeIndex} animateHeight>
              <div className="schedule__program-morning">
                {morningConferences.map((conference) => (
                  <SlotItem conference={conference} />
                ))}
                {afternoonConferences.length ? (
                  <Button empty size="small" onClick={() => handleChangeIndex(1)}>
                    Afternoon
                    <span className="icon-chevron-right" />
                  </Button>
                ) : null}
              </div>
              {!!afternoonConferences.length && (
                <div className="schedule__program-afternoon">
                  {afternoonConferences.map((conference) => (
                    <SlotItem conference={conference} />
                  ))}
                  <Button empty size="small" onClick={() => handleChangeIndex(0)}>
                    <span className="icon-chevron-left" />
                    Morning
                  </Button>
                </div>
              )}
            </SwipeableViews>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
