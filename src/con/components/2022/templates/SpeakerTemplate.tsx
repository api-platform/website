import React from 'react';
import Layout from '@con/components/2022/layout';
import { PageProps } from 'gatsby';
import SpeakerTemplateBase from '@con/components/templates/SpeakerTemplate';
import SpeakerConferenceSlot from '@con/components/2022/Speakers/SpeakerConferenceSlot';
import BuyButton from '../BuyButton';

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
  const { pageContext } = props;
  return (
    <Layout logoAlwaysVisible>
      <SpeakerTemplateBase
        {...props}
        SpeakerConferenceSlotComponent={SpeakerConferenceSlot}
        extraContent={
          <BuyButton className="mt-20 pink square" id={pageContext.name} size="large">
            Get your ticket!
          </BuyButton>
        }
      />
    </Layout>
  );
};

export default SpeakerTemplate;
