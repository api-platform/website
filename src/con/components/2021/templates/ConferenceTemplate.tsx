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
    track: 'FR' | 'EN';
    start: string;
    end: string;
    edition: string;
  };
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = (props) => {
  return (
    <Layout logoAlwaysVisible>
      <ConferenceTemplateBase {...props} tracks={tracks} />
    </Layout>
  );
};

export default ConferenceTemplate;
