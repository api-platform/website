import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import Cover from '@con/components/2021/Cover';
import Partners from '@con/components/2022/Partners';
import Speakers from '@con/components/2021/Speakers';
import Layout from '@con/components/2022/layout';
import Venue from '@con/components/2021/Venue';
import Contact from '@con/components/2021/Contact';
import Pricing from '@con/components/2022/Pricing';
import PartnersData from '@con/data/2022/partners';
import '@con/styles/home/index.scss';
import BuyButton from '@con/components/2022/BuyButton';
import { TITLE } from '@con/data/meta';

const Conf2022: React.ComponentType = () => {
  return (
    <Layout>
      <Helmet titleTemplate="">
        <title>{`${TITLE}: meet the best API experts!`}</title>
        <meta property="og:title" content={`${TITLE}: meet the best API experts!`} />
        <meta name="twitter:title" content={`${TITLE}: meet the best API experts!`} />
      </Helmet>
      <Cover
        date="September 15 - 16, 2022 | Lille & online"
        baseline="The only event dedicated to API Platform and its ecosystem"
        button={
          <div className="conf__cover-buttons">
            <BuyButton className="pink" id="cover" size="large">
              Buy tickets
            </BuyButton>
            <Link to="/con/2022/schedule">
              <div className="conf__button">Full schedule</div>
            </Link>
          </div>
        }
      />
      <Speakers numberVisibles={12}>
        <p className="conf__section-subtitle">Discover our amazing international speakers!</p>
      </Speakers>
      <Pricing />
      <div className="pt-50">
        <Venue
          subtitle=" The on-site edition will take place in Lille, meeting point of European cities and touristic capital of the
        Flemish region. If you can't attend the event physically, you can watch both tracks online."
        />
      </div>
      <Partners data={PartnersData} />

      <Contact />
    </Layout>
  );
};

export default Conf2022;
