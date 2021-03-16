import React from 'react';
import Cover from '@components/conf/Cover';
import Speakers from '@components/conf/Speakers';
import Schedule from '@components/conf/Schedule';
import Layout from '@components/conf/layout';
import Venue from '@components/conf/Venue';
import Partners from '@components/conf/Partners';
import Pricing from '@components/conf/Pricing';
import Contact from '@components/conf/Contact';
import '@styles/components/conf/index.scss';
import { PageProps } from 'gatsby';

const Conf2021: React.ComponentType<PageProps> = (pageProps) => {
  return (
    <Layout location={pageProps.location}>
      <Cover />
      <Speakers />
      <Schedule />
      <Venue />
      <Pricing />
      <Partners />
      <Contact />
    </Layout>
  );
};

export default Conf2021;
