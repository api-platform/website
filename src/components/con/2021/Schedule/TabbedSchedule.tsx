import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TrackSelector from './TrackSelector';
import tracks from '../data/tracks';
import SlotItem from './SlotItem';
import { getFullConferencesByTrack } from '../data/api';
import { FullConference } from '../types/index';
import { isMorningTime } from '../utils';
import Button from '../common/Button';

const TabbedSchedule: React.ComponentType = () => {
  const swipeableViews = useRef(null);
  const [selectedTrack, setSelectedTrack] = useState(tracks.length);
  const [selectedMomentDay, setSelectedMomentDay] = useState(0);

  const conferences: FullConference[] = useMemo(() => getFullConferencesByTrack(selectedTrack), [selectedTrack]);
  const morningConferences = useMemo(() => conferences.filter((conference) => isMorningTime(conference.start)), [
    conferences,
  ]);
  const afternoonConferences = useMemo(() => conferences.filter((conference) => !isMorningTime(conference.start)), [
    conferences,
  ]);

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
        <SwipeableViews
          key={selectedTrack}
          index={selectedMomentDay}
          onChangeIndex={handleChangeIndex}
          animateHeight
          ref={swipeableViews}
        >
          <div className="schedule__program-morning">
            {morningConferences.map((conference) => (
              <SlotItem key={conference.id} conference={conference} />
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
                <SlotItem key={conference.id} conference={conference} />
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
  );
};

export default TabbedSchedule;
