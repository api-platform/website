import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '@con/components/2021/Cover';
import Speakers from '@con/components/2021/Speakers';
import Layout from '@con/components/2023/layout';
import Contact from '@con/components/2021/Contact';
import '@con/styles/home/index.scss';
import { TITLE } from '@con/data/meta';
import LastEdition from '@con/components/2023/home/LastEdition';
import MissingConferences from '@con/components/2023/home/MissingConferences';
import SponsorShip from '@con/components/2023/SponsorShip';

const Conf2023: React.ComponentType = () => {
  return (
    <Layout>
      <Helmet titleTemplate="">
        <title>{`${TITLE}: meet the best API experts!`}</title>
        <meta property="og:title" content={`${TITLE}: meet the best API experts!`} />
        <meta name="twitter:title" content={`${TITLE}: meet the best API experts!`} />
      </Helmet>
      <Cover
        date="September 21 - 22, 2023 | Lille & online"
        baseline="Meet the best API experts at the only event dedicated to the API Platform framework and its ecosystem."
        button={
          <div>
            <a className="conf__button" href="mailto:events@les-tilleuls.coop?subject=I want to be a speaker!">
              Become a speaker!
            </a>
          </div>
        }
      />
      <LastEdition />
      <MissingConferences />
      <Speakers>
        <p className="conf__section-subtitle">
          Our selected speakers will be revealed in 2023. Want to be part of them?{' '}
          <a href="mailto:events@les-tilleuls.coop?subject=I want to be a speaker!">Contact us!</a>
        </p>
      </Speakers>
      <SponsorShip />
      <Contact />
    </Layout>
  );
};

export default Conf2023;
