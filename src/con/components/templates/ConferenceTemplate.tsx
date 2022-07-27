import React from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '@con/components/common/SectionTitle';
import { PageProps } from 'gatsby';
import classNames from 'classnames';
import Button from '@con/components/common/Button';
import useSpeakers from '@con/hooks/useSpeakers';
import { getConferenceDate } from '@con/utils';
import SpeakerCircle from '@con/components/2021/Speakers/SpeakerCircle';
import '@con/styles/index.scss';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    speakers: string[];
    track?: string;
    start: string;
    end: string;
    date?: string;
  };
  trackSubtitle?: JSX.Element;
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = ({ trackSubtitle, pageContext }) => {
  const { html, title, speakers: speakerIds, start, end, date } = pageContext;
  const speakers = useSpeakers(speakerIds);

  return (
    <div className="conf__conference">
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Helmet>
      <div className="container">
        <div className="conference__header">
          <SectionTitle dark lined h1 small={50 < title.length}>
            <strong>{title}</strong>
          </SectionTitle>
          <>
            {trackSubtitle}
            {date ? <p className="header__date">{getConferenceDate(date, start, end)}</p> : null}
          </>
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
