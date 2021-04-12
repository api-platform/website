import React from 'react';
import Layout from '@components/con/2021/layout';
import { PageProps } from 'gatsby';
import SectionTitle from '../common/SectionTitle';
import ContactCard from '../layout/ContactCard';

interface LegalTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
  };
}

const LegalTemplate: React.ComponentType<LegalTemplateProps> = ({ pageContext, location }) => {
  const { html, title } = pageContext;

  return (
    <Layout location={location}>
      <div className="conf__legal">
        <div className="container">
          <div className="legal__header">
            <SectionTitle dark lined h1>
              <strong>{title}</strong>
            </SectionTitle>
          </div>
          <div className="legal__content dotted-corner">
            <div className="conference__abstract" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <div className="conf__contact">
            <ContactCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalTemplate;
