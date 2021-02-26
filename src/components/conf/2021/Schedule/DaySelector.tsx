import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import days from '../data/days';

interface DaySelectorProps {
  selectedDay: number;
  setSelectedDay: (val: number) => void;
}

const DaySelector: React.ComponentType<DaySelectorProps> = ({ selectedDay, setSelectedDay }) => {
  const [arrowPosition, setArrowPosition] = useState<number>(0);
  const arrow = useRef<HTMLDivElement>();
  const refs = useRef({});
  const addRef = (index) => (ref) => {
    refs.current[index] = ref;
  };

  useEffect(() => {
    const obj = refs.current?.[selectedDay];
    if (!obj) return;
    const childPos = obj.offsetTop;
    const height = obj.offsetHeight;
    setArrowPosition(childPos + height / 2);
  }, [selectedDay, setArrowPosition, refs]);

  return (
    <div className="schedule__day-selector">
      {days.map((day) => (
        <div
          className={classNames('schedule__day', {
            selected: day.index === selectedDay,
          })}
          ref={addRef(day.index)}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            setSelectedDay(day.index);
          }}
        >
          <div className="h5" data-value="type">
            {day.type}
          </div>
          <div className="h5" data-value="day">{`day ${day.day}`}</div>
          <div className="overline" data-value="date">{`day ${day.date}`}</div>
        </div>
      ))}
      <div className="schedule__arrow" ref={arrow} style={{ top: arrowPosition }} />
    </div>
  );
};

export default DaySelector;
