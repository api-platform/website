import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import tracks from '../data/tracks';

interface TrackSelectorProps {
  selectedTrack: number;
  setSelectedTrack: (val: number) => void;
}

const TrackSelector: React.ComponentType<TrackSelectorProps> = ({ selectedTrack, setSelectedTrack }) => {
  const [arrowPosition, setArrowPosition] = useState<number>(0);
  const arrow = useRef<HTMLDivElement>();
  const refs = useRef({});
  const addRef = (index) => (ref) => {
    refs.current[index] = ref;
  };

  useEffect(() => {
    const obj = refs.current?.[selectedTrack];
    if (!obj) return;
    const childPos = obj.offsetTop;
    const height = obj.offsetHeight;
    setArrowPosition(childPos + height / 2);
  }, [selectedTrack, setArrowPosition, refs]);

  return (
    <div className="schedule__day-selector">
      {tracks.map((track) => (
        <div
          key={track.index}
          className={classNames('schedule__day', {
            selected: track.index === selectedTrack,
          })}
          ref={addRef(track.index)}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            setSelectedTrack(track.index);
          }}
        >
          <div className="h5" data-value="type">
            {track.type}
          </div>
          <div className="h5" data-value="day">{`track #${track.index}`}</div>
          <div className="overline" data-value="date">{`day ${track.date}`}</div>
        </div>
      ))}
      <div className="schedule__arrow" ref={arrow} style={{ top: arrowPosition }} />
    </div>
  );
};

export default TrackSelector;
