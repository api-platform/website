import React from 'react';
import EmptySpeaker1 from '@con/images/empty-speaker1.svg';
import EmptySpeaker2 from '@con/images/empty-speaker2.svg';
import EmptySpeaker3 from '@con/images/empty-speaker3.svg';

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
    <div className="conf__speaker-resume">
      <div className="conf__speaker-content hoverable disabled">
        <div className="circle__effect">
          <div className="circle">
            <img width="240" height="240" src={image} alt="Coming soon..." className="circle__picture" />
          </div>
        </div>
        <div className="infos">
          <h3 className="h5 lined">Coming soon</h3>
        </div>
      </div>
    </div>
  );
};

export default EmptySpeakerCircle;
