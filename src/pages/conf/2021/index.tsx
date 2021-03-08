import React from 'react';
import Cover from '@components/conf/2021/Cover';
import Helmet from 'react-helmet';
import Speakers from '@components/conf/2021/Speakers';
import Schedule from '@components/conf/2021/Schedule';
import Layout from '@components/conf/2021/layout';
import Venue from '@components/conf/2021/Venue';
import Partners from '@components/conf/2021/Partners';
import Pricing from '@components/conf/2021/Pricing';
import Contact from '@components/conf/2021/Contact';
import '@styles/components/conf/index.scss';

const Conf2021: React.ComponentType = () => {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/conf/2021',
  };
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'API Platform Conference 2021',
    description: 'The first event dedicated to Api Platform and its ecosystem',
    url: 'https://api-platform.com/conf/2021',
    eventStatus: 'http://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2021-09-08',
    endDate: '2021-09-10',
    organizer: {
      '@type': 'Organization',
      name: 'Les-Tilleuls.coop',
      url: 'https://les-tilleuls.coop/en',
    },
    location: {
      '@type': 'Place',
      name: 'Euratechnologies',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressRegion: 'Hauts de France',
        postalCode: '59000',
        streetAddress: 'Place de Saintignon, 165 avenue de Bretagne',
      },
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>Api Platform Conference 2021</title>
        <meta name="description" content="The first event dedicated to Api Platform and its ecosystem" />
        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
        <script type="application/ld+json">{JSON.stringify(eventData)}</script>
      </Helmet>
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
