import React from 'react';
import Layout from '@components/con/2021/layout';
import SectionTitle from '@components/con/2021/common/SectionTitle';
import { PageProps } from 'gatsby';
import tracks from '../data/tracks';
import Button from '../common/Button';
import SpeakerCircle from '../Speakers/SpeakerCircle';
import { convertTime } from '../utils';
import useSpeaker from '../hooks/useSpeaker';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    speaker: string;
    track: number;
    start: string;
    end: string;
  };
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = ({ pageContext, location }) => {
  const { html, title, speaker: speakerId, track: trackID, start, end } = pageContext;
  const speaker = useSpeaker(speakerId);
  const track = tracks.find((t) => t.index === trackID);

  return (
    <Layout location={location}>
      <div className="conf__conference">
        <div className="container">
          <div className="conference__header">
            <SectionTitle dark lined h1 small={50 < title.length}>
              <strong>{title}</strong>
            </SectionTitle>
            {track ? (
              <>
                <p className="overline header__subtitle">
                  <strong>{`Track #${track.index} `}</strong>
                  {`- ${track.type}`}
                </p>
                <p className="header__date">
                  {end && start ? `September, 10 2021 · ${convertTime(start)} - ${convertTime(end)}` : 'Sep, 10 2021'}
                </p>
              </>
            ) : null}
          </div>
          <div className="conference__content">
            <div className="conference__speaker">
              <SpeakerCircle speaker={speaker} hoverable={false} social={false} />
              <Button className="white square" size="small" to={speaker.slug}>
                See speaker details
              </Button>
            </div>
            <div
              className="conference__abstract dotted-corner corner-bottom"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConferenceTemplate;
