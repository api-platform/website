import React from 'react';
import { PageProps } from 'gatsby';
import Landing from '@con/components/home/Landing';
import '@con/styles/landing/index.scss';
import Layout from '@con/components/layout';

const Con: React.ComponentType<PageProps> = () => (
  <Layout logoAlwaysVisible>
    <Landing />
  </Layout>
);

export default Con;
