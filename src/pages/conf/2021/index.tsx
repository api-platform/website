import React, { createContext, useState, useCallback, useEffect } from 'react';
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
import Footer from '@components/conf/2021/layout/Footer';
import Nav from '@components/conf/2021/layout/Nav';
import { PageProps } from 'gatsby';

export const ConfContext = createContext(null);

const Conf2021: React.ComponentType<PageProps> = ({ location }) => {
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
  const [activeLink, setActiveLink] = useState('home');
  const [hasScroll, setHasScroll] = useState(!('#home' === location.hash || '' === location.hash));

  const onScroll = useCallback(() => {
    setHasScroll(50 < window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const goToLink = useCallback(
    (section) => {
      const element = document.querySelector(`#${section}`);
      element.scrollIntoView({ behavior: 'smooth' });
      setHasScroll('home' !== section);
    },
    [setHasScroll]
  );

  return (
    <ConfContext.Provider value={{ activeLink, setActiveLink, goToLink }}>
      <Layout>
        <Helmet>
          <title>Api Platform Conference 2021</title>
          <meta name="description" content="The first event dedicated to Api Platform and its ecosystem" />
          <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
          <script type="application/ld+json">{JSON.stringify(eventData)}</script>
        </Helmet>
        <div className="conf" id="conf">
          <div className="conf__background" />
          <div className="conf__content" id="conf">
            <Nav withScroll={hasScroll} />
            <Cover />
            <Speakers />
            <Schedule />
            <Venue />
            <Pricing />
            <Partners />
            <Contact />
            <Footer />
          </div>
        </div>
      </Layout>
    </ConfContext.Provider>
  );
};

export default Conf2021;
