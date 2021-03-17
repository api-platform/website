import React from 'react';
import Cover from '@components/con/2021/Cover';
import Speakers from '@components/con/2021/Speakers';
import Schedule from '@components/con/2021/Schedule';
import Layout from '@components/con/2021/layout';
import Venue from '@components/con/2021/Venue';
import Partners from '@components/con/2021/Partners';
import Pricing from '@components/con/2021/Pricing';
import Contact from '@components/con/2021/Contact';
import '@styles/components/con/2021/index.scss';
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
