import React from 'react';
import { getConferenceDate } from '@con/utils';
import Button from '@con/components/common/Button';
import { Conference } from 'src/con/types';
import tracks from '@con/data/2021/tracks';

const SpeakerConferenceSlot: React.ComponentType<{ conference: Conference }> = ({ conference }) => {
  const track = conference.track && tracks.find((t) => t.id === conference.track);
  const { start, end, date, title, slug, short } = conference;
  return (
    <div className="speaker__conference-slot dotted-corner">
      <div className="conference__track">
        {track ? (
          <>
            {' '}
            <span className="h6">{`Track #${track.id}`}</span>
            <span className="overline">{track.type}</span>
          </>
        ) : null}
      </div>
      <div className="conference__content">
        <span className="overline">{getConferenceDate(date, start, end)}</span>
        <h3 className="h6 lined lined-left">{title}</h3>
        <p>{short}</p>
        <Button className="square" size="small" to={slug}>
          See details
        </Button>
      </div>
    </div>
  );
};

export default SpeakerConferenceSlot;
