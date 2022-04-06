import React from 'react';
import Cover from '@con/components/2021/Cover';
import Speakers from '@con/components/2021/Speakers';
import Schedule from '@con/components/2021/Schedule';
import Layout from '@con/components/2021/layout';
import Venue from '@con/components/2021/Venue';
import Partners from '@con/components/2021/Partners';
import Covid from '@con/components/2021/Covid';
import Button from '@con/components/common/Button';
import PartnersData from '@con/data/2021/partners';
import breaks from '@con/data/2021/breaks';
import { Conference } from 'src/con/types';
import Contact from '@con/components/2021/Contact';
import tracks from '@con/data/2021/tracks';
import '@con/styles/home/index.scss';

const Conf2021: React.ComponentType = () => {
  return (
    <Layout>
      <Cover
        date="September 10, 2021 - Lille & online"
        baseline=" The first international conference dedicated to API Platform and its ecosystem"
        button={<Button to="/con">{`< Back to current edition`}</Button>}
      />
      <Speakers>
        <p className="conf__section-subtitle">
          Join international speakers sharing their knowledge on English-speaking (streamed online) and French-speaking
          tracks.
        </p>
      </Speakers>
      <Schedule breaks={breaks as Conference[]} tracks={tracks} />
      <Venue />
      <Covid />
      <Partners data={PartnersData} />
      <Contact />
    </Layout>
  );
};

export default Conf2021;
