import React from 'react';
import Layout from '@components/con/2021/layout';
import SectionTitle from '@components/con/2021/common/SectionTitle';
import { PageProps } from 'gatsby';

interface ConferenceTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
  };
}

const ConferenceTemplate: React.ComponentType<ConferenceTemplateProps> = ({ pageContext, location }) => {
  const { html, title } = pageContext;
  return (
    <Layout location={location}>
      <div className="conf__conference">
        <div className="container">
          <SectionTitle dark>
            <strong>{title}</strong>
          </SectionTitle>
          <div className="conference__content">
            <div className="conference__details">Coucou</div>
            <div className="conference__abstract" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConferenceTemplate;
