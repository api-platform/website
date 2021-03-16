import React, { createContext, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import Helmet from 'react-helmet';
import '@styles/components/conf/index.scss';
import Footer from '@components/conf/layout/Footer';
import Nav from '@components/conf/layout/Nav';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const ConfContext = createContext(null);

interface LayoutProps {
  location: {
    pathname?: string;
    hash?: string;
  };
}

const Layout: React.ComponentType<LayoutProps> = ({ children, location }) => {
  dayjs.extend(localizedFormat);
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/conf',
  };
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'API Platform Conference 2021',
    description: 'The first event dedicated to Api Platform and its ecosystem',
    url: 'https://api-platform.com/conf',
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

  const goToLink = useCallback((section) => {
    const element = document.querySelector(`#${section}`);
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ConfContext.Provider value={{ activeLink, setActiveLink, goToLink }}>
      <Helmet>
        <title>Api Platform Conference 2021</title>
        <meta name="description" content="The first event dedicated to Api Platform and its ecosystem" />
        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
        <script type="application/ld+json">{JSON.stringify(eventData)}</script>
      </Helmet>
      <div className="conf" id="conf">
        <div className="conf__background" />
        <Nav location={location} />
        <div className="conf__content">
          {children}
          <Footer />
        </div>
      </div>
    </ConfContext.Provider>
  );
};

export default Layout;
