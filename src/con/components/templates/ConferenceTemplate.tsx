import React from 'react';
import SectionTitle from '@con/components/common/SectionTitle';
import { PageProps } from 'gatsby';
import classNames from 'classnames';
import Button from '@con/components/common/Button';
import useSpeakers from '@con/hooks/useSpeakers';
import { convertTime } from '@con/utils';
import SpeakerCircle from '@con/components/2021/Speakers/SpeakerCircle';
import { Track } from '@con/types';
import '@con/styles/index.scss';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    speakers: string[];
    track: 'FR' | 'EN';
    start: string;
    end: string;
  };
  tracks: Track[];
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = ({ tracks, pageContext }) => {
  const { html, title, speakers: speakerIds, track: trackID, start, end } = pageContext;
  const speakers = useSpeakers(speakerIds);
  const track = tracks.find((t) => t.id === trackID);

  return (
    <div className="conf__conference">
      <div className="container">
        <div className="conference__header">
          <SectionTitle dark lined h1 small={50 < title.length}>
            <strong>{title}</strong>
          </SectionTitle>
          {track ? (
            <>
              <p className="overline header__subtitle">
                <strong>{`Track #${track.id} `}</strong>
                {`- ${track.type}`}
              </p>
              <p className="header__date">
                {end && start ? `September, 10 2021 · ${convertTime(start)} - ${convertTime(end)}` : 'Sep, 10 2021'}
              </p>
            </>
          ) : null}
        </div>
        <div className="conference__content">
          <div className={classNames('conference__speaker', { minified: 1 < speakers.length })}>
            {speakers.map((speaker) => (
              <React.Fragment key={speaker.name}>
                <SpeakerCircle speaker={speaker} hoverable={false} social={false} />
                <Button className="white square" size="small" to={speaker.slug}>
                  See speaker details
                </Button>
              </React.Fragment>
            ))}
          </div>
          <div
            className="conference__abstract dotted-corner corner-bottom"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConferenceTemplate;
