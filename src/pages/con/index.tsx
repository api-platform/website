import React from 'react';
import Layout from '@components/con/layout';
import { PageProps } from 'gatsby';
import Landing from '@con/home/Landing';
import '@styles/components/con/home/index.scss';

const Con: React.ComponentType<PageProps> = (pageProps) => {
  return (
    <Layout location={pageProps.location}>
      <Landing />
    </Layout>
  );
};

export default Con;
