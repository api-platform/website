import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import tracks from '../data/tracks';

interface TrackSelectorProps {
  selectedTrack: 'FR' | 'EN';
  setSelectedTrack: (val: 'FR' | 'EN') => void;
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
    <div className="schedule__track-selector">
      <div className="schedule__arrow" ref={arrow} style={{ top: arrowPosition }} />
      {tracks.map((track) => (
        <div
          key={track.id}
          className={classNames('schedule__track', {
            selected: track.id === selectedTrack,
          })}
          ref={addRef(track.id)}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            setSelectedTrack(track.id);
          }}
        >
          <div className="h5" data-value="day">{`track #${track.id}`}</div>
          <div className="overline" data-value="type">{`${track.type}`}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackSelector;
