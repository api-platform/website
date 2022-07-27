import React from 'react';
import ConferenceTemplateBase from '@con/components/templates/ConferenceTemplate';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2022/layout';
import { getDayByDate } from '@con/data/2022/days';

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
      />
    </Layout>
  );
};

export default ConferenceTemplate;
