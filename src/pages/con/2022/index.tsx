import React from 'react';
import Cover from '@con/components/2021/Cover';
import Speakers from '@con/components/2021/Speakers';
import Schedule from '@con/components/2021/Schedule';
import Layout from '@con/components/2022/layout';
import Venue from '@con/components/2021/Venue';
import Contact from '@con/components/2021/Contact';
import Pricing from '@con/components/2022/Pricing';
import SponsorShip from '@con/components/2022/SponsorShip';
import LastEdition from '@con/components/2022/home/LastEdition';
import MissingConferences from '@con/components/2022/home/MissingConferences';
import breaks from '@con/data/2022/breaks';
import { Conference } from 'src/con/types';
import tracks from '@con/data/2022/tracks';
import '@con/styles/home/index.scss';

const Conf2022: React.ComponentType = () => {
  return (
    <Layout>
      <Cover
        date="September 15 - 16, 2022 | Lille & online"
        baseline="The only event dedicated to Api Platform and its ecosystem"
      >
        Lalalalila
      </Cover>
      <LastEdition />
      <MissingConferences />
      <Speakers />
      <Schedule breaks={breaks as Conference[]} tracks={tracks} />
      <Venue />
      <Pricing />
      <SponsorShip />

      <Contact />
    </Layout>
  );
};

export default Conf2022;
