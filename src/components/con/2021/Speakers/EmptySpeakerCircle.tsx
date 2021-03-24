import React from 'react';
import circle from '../images/circle.svg';
import EmptySpeaker1 from '../images/empty-speaker1.svg';
import EmptySpeaker2 from '../images/empty-speaker2.svg';
import EmptySpeaker3 from '../images/empty-speaker3.svg';

interface EmptySpeakerCircleProps {
  index: 1 | 2 | 3;
}

const EmptySpeakerCircle: React.ComponentType<EmptySpeakerCircleProps> = ({ index }) => {
  let image;
  switch (index) {
    case 1:
      image = EmptySpeaker1;
      break;
    case 2:
      image = EmptySpeaker2;
      break;
    default:
      image = EmptySpeaker3;
  }

  return (
    <div className="conf__speaker-circle">
      <div className="conf__speaker-content hoverable disabled">
        <img width="270" height="270" className="circle__effect" src={circle} alt="effect" />
        <div className="circle">
          <img width="240" height="240" src={image} alt="Coming soon..." className="circle__picture" />
        </div>
        <div className="infos">
          <h3 className="h5 lined">Coming soon</h3>
        </div>
      </div>
    </div>
  );
};

export default EmptySpeakerCircle;
