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
import BuyButton from '@con/components/2022/BuyButton';
import Pricing from '@con/components/2023/Pricing';
import Venue from '@con/components/2021/Venue';

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
          <div className="conf__cover-buttons">
            <BuyButton className="pink" id="cover" size="large">
              Buy tickets
            </BuyButton>
            <div>
              <a className="conf__button" href="mailto:events@les-tilleuls.coop?subject=I want to be a speaker!">
                Become a speaker!
              </a>
            </div>
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
      <Pricing />
      <div className="pt-50">
        <Venue
          subtitle=" The on-site edition will take place in Lille, meeting point of European cities and touristic capital of the
        Flemish region. If you can't attend the event physically, you can watch both tracks online."
        />
      </div>
      <div className="pt-50">
        <SponsorShip />
      </div>
      <Contact />
    </Layout>
  );
};

export default Conf2023;
