import React from 'react';
import Cover from '@components/con/2021/Cover';
import Speakers from '@components/con/2021/Speakers';
import Schedule from '@components/con/2021/Schedule';
import Layout from '@components/con/2021/layout';
import Venue from '@components/con/2021/Venue';
import Partners from '@components/con/2021/Partners';
import Contact from '@components/con/2021/Contact';
import Covid from '@components/con/2021/Covid';

const Conf2021: React.ComponentType = () => {
  return (
    <Layout>
      <Cover />
      <Speakers />
      <Schedule />
      <Venue />
      <Covid />
      <Partners />
      <Contact />
    </Layout>
  );
};

export default Conf2021;
