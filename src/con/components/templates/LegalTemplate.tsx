import React from 'react';
import { PageProps } from 'gatsby';
import ContactCard from '@con/components/common/ContactCard';
import SectionTitle from '@con/components/common/SectionTitle';
import '@con/styles/index.scss';

interface LegalTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
  };
}

const LegalTemplate: React.ComponentType<LegalTemplateProps> = ({ pageContext }) => {
  const { html, title } = pageContext;
  const htmlWithLinks = html.replace(/href="#/g, 'href="/con/2021/#').replace(/href="\/\//g, 'href="/'); // fix home anchors links

  return (
    <div className="conf__legal">
      <div className="container">
        <div className="legal__header">
          <SectionTitle dark lined h1>
            <strong>{title}</strong>
          </SectionTitle>
        </div>
        <div className="legal__content dotted-corner">
          <div className="conference__abstract" dangerouslySetInnerHTML={{ __html: htmlWithLinks }} />
        </div>
        <div className="conf__contact">
          <ContactCard />
        </div>
      </div>
    </div>
  );
};

export default LegalTemplate;
