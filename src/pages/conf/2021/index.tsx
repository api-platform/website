import React from 'react';
import Cover from '@components/conf/2021/Cover';
import Speakers from '@components/conf/2021/Speakers';
import Schedule from '@components/conf/2021/Schedule';
import Layout from '@components/conf/2021/layout';
import Venue from '@components/conf/2021/Venue';
import Partners from '@components/conf/2021/Partners';
import Pricing from '@components/conf/2021/Pricing';
import Contact from '@components/conf/2021/Contact';
import '@styles/components/conf/index.scss';

const Conf2021: React.ComponentType = () => {
  return (
    <Layout>
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
