import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TrackSelector from './TrackSelector';
import SlotItem from './SlotItem';
import { isMorningTime } from '../utils';
import Button from '../common/Button';
import useConferences from '../hooks/useConferences';

const TabbedSchedule: React.ComponentType = () => {
  const swipeableViews = useRef(null);
  const [selectedTrack, setSelectedTrack] = useState<'EN' | 'FR'>('EN');
  const [selectedMomentDay, setSelectedMomentDay] = useState(0);
  const conferences = useConferences();

  const trackConferences = useMemo(() => conferences.filter((conference) => conference.track === selectedTrack), [
    conferences,
    selectedTrack,
  ]);

  const morningConferences = useMemo(
    () => trackConferences.filter((conference) => isMorningTime(conference.start) || !conference.start),
    [trackConferences]
  );
  const afternoonConferences = useMemo(
    () => trackConferences.filter((conference) => conference.start && !isMorningTime(conference.start)),
    [trackConferences]
  );

  const handleChangeIndex = (index: 0 | 1) => {
    setSelectedMomentDay(index);
  };

  useEffect(() => handleChangeIndex(0), [selectedTrack]);

  const onResize = useCallback(() => {
    if (swipeableViews.current) swipeableViews.current.updateHeight();
  }, [swipeableViews]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  useLayoutEffect(() => {
    onResize();
  }, [onResize]);

  return (
    <div className="conf__schedule-tabbed">
      <TrackSelector selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} />
      <div className="schedule__program">
        {afternoonConferences.length ? (
          <SwipeableViews
            key={selectedTrack}
            index={selectedMomentDay}
            onChangeIndex={handleChangeIndex}
            animateHeight
            ref={swipeableViews}
          >
            <div className="schedule__program-morning">
              {morningConferences.map((conference) => (
                <SlotItem key={conference.slug} conference={conference} />
              ))}
              <Button empty size="small" onClick={() => handleChangeIndex(1)}>
                Afternoon
                <span className="icon-chevron-right" />
              </Button>
            </div>
            <div className="schedule__program-afternoon">
              {afternoonConferences.map((conference) => (
                <SlotItem key={conference.slug} conference={conference} />
              ))}
              <Button empty size="small" onClick={() => handleChangeIndex(0)}>
                <span className="icon-chevron-left" />
                Morning
              </Button>
            </div>
          </SwipeableViews>
        ) : (
          <div className="schedule__program-morning">
            {morningConferences.map((conference) => (
              <SlotItem key={conference.slug} conference={conference} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedSchedule;
