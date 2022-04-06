import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2022/layout';
import LegalTemplateBase from '@con/components/templates/LegalTemplate';

interface LegalTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    edition: string;
  };
}

const LegalTemplate: React.ComponentType<LegalTemplateProps> = (props) => {
  return (
    <Layout logoAlwaysVisible>
      <LegalTemplateBase {...props} />
    </Layout>
  );
};

export default LegalTemplate;
