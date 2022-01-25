import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '@con/components/2021/layout';
import SpeakersPage from '@con/components/common/SpeakersPage';

const Speakers: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <SpeakersPage />
  </Layout>
);

export default Speakers;
