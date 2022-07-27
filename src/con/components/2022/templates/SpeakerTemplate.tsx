import React from 'react';
import Layout from '@con/components/2022/layout';
import { PageProps } from 'gatsby';
import SpeakerTemplateBase from '@con/components/templates/SpeakerTemplate';
import SpeakerConferenceSlot from '@con/components/2022/Speakers/SpeakerConferenceSlot';

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
      <SpeakerTemplateBase {...props} SpeakerConferenceSlotComponent={SpeakerConferenceSlot} />
    </Layout>
  );
};

export default SpeakerTemplate;
