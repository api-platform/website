import React from 'react';
import ConferenceTemplateBase from '@con/components/templates/ConferenceTemplate';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2023/layout';
import { getDayByDate } from '@con/data/2023/days';
import BuyButton from '../BuyButton';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    speakers: string[];
    track?: string;
    start: string;
    end: string;
    date: string;
    edition: string;
  };
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = (props) => {
  const { pageContext } = props;
  const { date, track } = pageContext;
  const day = getDayByDate(date);
  return (
    <Layout logoAlwaysVisible>
      <ConferenceTemplateBase
        {...props}
        trackSubtitle={
          <p className="overline header__subtitle">
            <strong>{day.title}</strong>
            {track ? ` - Track #${track}` : null}
          </p>
        }
        extraContent={
          <BuyButton className="mt-20 pink square" id={pageContext.title} size="large">
            Get your ticket!
          </BuyButton>
        }
      />
    </Layout>
  );
};

export default ConferenceTemplate;
