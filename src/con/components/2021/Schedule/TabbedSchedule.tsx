import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Button from '@con/components/common/Button';
import { isMorningTime, sortByStartDate } from '@con/utils';
import { Conference, Track } from '@con/types';
import TrackSelector from './TrackSelector';
import SlotItem from './SlotItem';

interface TabbedScheduleProps {
  conferences: Conference[];
  breaks: Conference[];
  tracks: Track[];
}

const TabbedSchedule: React.ComponentType<TabbedScheduleProps> = ({ conferences, breaks, tracks }) => {
  const swipeableViews = useRef(null);
  const [selectedTrack, setSelectedTrack] = useState<'EN' | 'FR'>('EN');
  const [selectedMomentDay, setSelectedMomentDay] = useState(0);
  const allConferences = useMemo(() => [...conferences, ...breaks], [conferences, breaks]);

  const trackConferences = useMemo(
    () => allConferences.filter((conference) => conference.track === selectedTrack || !conference.track),
    [allConferences, selectedTrack]
  );

  const morningConferences = useMemo(
    () =>
      trackConferences
        .filter((conference) => isMorningTime(conference.start) || !conference.start)
        .sort(sortByStartDate),
    [trackConferences]
  );

  const afternoonConferences = useMemo(
    () =>
      trackConferences
        .filter((conference) => conference.start && !isMorningTime(conference.start))
        .sort(sortByStartDate),
    [trackConferences]
  );

  const handleChangeIndex = (index: 0 | 1) => {
    setSelectedMomentDay(index);
  };

  useLayoutEffect(() => handleChangeIndex(0), [selectedTrack]);

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
    setTimeout(() => {
      onResize();
    }, 500);
  }, [onResize]);

  return (
    <div className="conf__schedule-tabbed">
      <TrackSelector selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} tracks={tracks} />
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
              {morningConferences.map((conference, index) => (
                <SlotItem key={`${conference.slug} ${index}`} conference={conference} />
              ))}
              <Button empty size="small" onClick={() => handleChangeIndex(1)}>
                Afternoon
                <span className="icon-chevron-right" />
              </Button>
            </div>
            <div className="schedule__program-afternoon">
              {afternoonConferences.map((conference, index) => (
                <SlotItem key={`${conference.slug} ${index}`} conference={conference} />
              ))}
              <Button empty size="small" onClick={() => handleChangeIndex(0)}>
                <span className="icon-chevron-left" />
                Morning
              </Button>
            </div>
          </SwipeableViews>
        ) : (
          <div className="schedule__program-morning">
            {morningConferences.map((conference, index) => (
              <SlotItem key={`${conference.slug} ${index}`} conference={conference} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedSchedule;
