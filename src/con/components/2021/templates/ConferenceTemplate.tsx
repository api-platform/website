import React from 'react';
import ConferenceTemplateBase from '@con/components/templates/ConferenceTemplate';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2021/layout';
import tracks from '@con/data/2021/tracks';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    speakers: string[];
    track?: string;
    start: string;
    end: string;
    edition: string;
  };
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = (props) => {
  const { pageContext } = props;
  const track = pageContext.track && tracks.find((t) => t.id === pageContext.track);
  return (
    <Layout logoAlwaysVisible>
      <ConferenceTemplateBase
        {...props}
        trackSubtitle={
          <p className="overline header__subtitle">
            <strong>{`Track #${pageContext.track} `}</strong>
            {`- ${track.type}`}
          </p>
        }
      />
    </Layout>
  );
};

export default ConferenceTemplate;
