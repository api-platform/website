import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '@con/components/2021/Cover';
import Speakers from '@con/components/2021/Speakers';
import Layout from '@con/components/2023/layout';
import Contact from '@con/components/2021/Contact';
import '@con/styles/home/index.scss';
import { TITLE } from '@con/data/meta';
import MissingConferences from '@con/components/2023/home/MissingConferences';
import PartnersData from '@con/data/2023/partners';
import BuyButton from '@con/components/2022/BuyButton';
import Pricing from '@con/components/2023/Pricing';
import Venue from '@con/components/2021/Venue';
import Partners from '@con/components/2022/Partners';

const Conf2023: React.ComponentType = () => {
  return (
    <Layout>
      <Helmet titleTemplate="">
        <title>{`${TITLE}: meet the best API experts!`}</title>
        <meta property="og:title" content={`${TITLE}: meet the best API experts!`} />
        <meta name="twitter:title" content={`${TITLE}: meet the best API experts!`} />
        <meta httpEquiv="Cache-Control" content="no-store, must-revalidate" />,
        <meta httpEquiv="Pragma" content="no-cache" />,
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      <Cover
        date="September 21 - 22, 2023 | Lille & online"
        baseline="Meet the best API experts at the only event dedicated to the API Platform framework and its ecosystem."
        button={
          <div className="conf__cover-buttons">
            <BuyButton className="pink" id="cover" size="large">
              Buy tickets
            </BuyButton>
          </div>
        }
      />
      <Speakers>
        <p className="conf__section-subtitle">
          Take a look at our first amazing speaker reveal! From security and testing to best practices, our lineup of
          speakers will cover a wide range of topics that you won&apos;t want to miss this September!
        </p>
      </Speakers>
      <Pricing />
      <div className="pt-50">
        <Venue subtitle="The API Platform Conference will take place in Lille, meeting point of big European cities. Rooms have been pre-booked and negotiated for you. Take a look at our <a href='/con/2023/faq/'>FAQ section</a> for more information." />
      </div>
      <MissingConferences />
      <div className="pt-50 pb-50">
        <Partners data={PartnersData} />
      </div>
      <Contact />
    </Layout>
  );
};

export default Conf2023;
