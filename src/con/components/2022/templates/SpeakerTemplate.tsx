import React from 'react';
import Layout from '@con/components/2022/layout';
import { PageProps } from 'gatsby';
import SpeakerTemplateBase from '@con/components/templates/SpeakerTemplate';
import tracks from '@con/data/2022/tracks';

interface SpeakerTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    id: string;
    name: string;
    slug: string;
    job: string;
    description: string;
    edition: string;
  };
}

const SpeakerTemplate: React.ComponentType<SpeakerTemplateProps> = (props) => {
  return (
    <Layout logoAlwaysVisible>
      <SpeakerTemplateBase {...props} tracks={tracks} />
    </Layout>
  );
};

export default SpeakerTemplate;
