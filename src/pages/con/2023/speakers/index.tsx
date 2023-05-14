import React from 'react';
import { Helmet } from 'react-helmet';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2023/layout';
import SpeakersPage from '@con/components/common/SpeakersPage';

const Speakers: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <Helmet>
      <title>Speakers</title>
      <meta property="og:title" content="Speakers" />
      <meta name="twitter:title" content="Speakers" />
    </Helmet>
    <SpeakersPage />
  </Layout>
);

export default Speakers;
