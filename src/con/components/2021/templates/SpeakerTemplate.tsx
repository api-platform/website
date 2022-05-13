import React from 'react';
import Layout from '@con/components/2021/layout';
import { PageProps } from 'gatsby';
import SpeakerTemplateBase from '@con/components/templates/SpeakerTemplate';
import tracks from '@con/data/2021/tracks';

interface SpeakerTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    id: string;
    name: string;
    slug: string;
    job: string;
    company: string;
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
