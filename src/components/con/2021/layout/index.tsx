import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import Helmet from 'react-helmet';
import '@styles/components/con/2021/index.scss';
import Footer from '@components/con/2021/layout/Footer';
import Nav from '@components/con/2021/layout/Nav';
import MobileNav from '@components/con/2021/layout/MobileNav';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PreloadFonts from '@con/layout/Fonts';
import { DESCRIPTION, TITLE, OG_IMAGE } from '../data/meta';
import prices from '../data/prices';
import helmetConfig from '../../../../helmetConfig';
import useDebouncedEffect from '../hooks/useDebounceEffect';

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

  const offersData = prices.map((price) => {
    const sortedOffers = price.offers.sort((a, b) => {
      if (dayjs(a.limitDate).isAfter(dayjs(b.limitDate))) return 1;
      if (dayjs(b.limitDate).isAfter(dayjs(a.limitDate))) return -1;
      return 0;
    });
    const activeOffer =
      sortedOffers.find((offer) => dayjs(offer.limitDate).isAfter(dayjs())) || sortedOffers[sortedOffers.length - 1];
    return {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: `${activeOffer.price}.00`,
      name: 1 === price.offers.length ? price.title : `${price.title} - ${activeOffer.title}`,
      priceCurrency: 'EUR',
      url: 'https://www.eventbrite.fr/e/api-platform-conference-2021-tickets-146559873527',
      validFrom: '2021-03-19',
    };
  });

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/con/2021/',
  };
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'API Platform Conference 2021',
    description: 'The first international conference dedicated to API Platform and its ecosystem',
    url: 'https://api-platform.com/con/2021/',
    eventStatus: 'http://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    startDate: '2021-09-10',
    endDate: '2021-09-10',
    organizer: {
      '@type': 'Organization',
      name: 'Les-Tilleuls.coop',
      url: 'https://les-tilleuls.coop/en',
    },
    location: [
      {
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
      {
        '@type': 'VirtualLocation',
        url: 'https://api-platform.com/con/2021/',
      },
    ],
    image: OG_IMAGE,
    offers: offersData,
  };

  const [sectionsVisibles, setSectionsVisibles] = useState<string[]>(['home']);
  const [isEventBriteLoaded, setIsEventBriteLoaded] = useState(false);

  const activeLink = useMemo(() => (sectionsVisibles.length ? sectionsVisibles[sectionsVisibles.length - 1] : 'home'), [
    sectionsVisibles,
  ]);

  const goToLink = useCallback((section) => {
    const element = document.querySelector(`#${section}`);
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    s.onload = () => {
      setIsEventBriteLoaded(true);
    };
    document.body.appendChild(s);
  }, [setIsEventBriteLoaded]);

  useDebouncedEffect(
    () => {
      window.history.replaceState(
        {},
        '',
        'home' === activeLink ? window.location.href.split('#')[0] : `#${activeLink}`
      );
    },
    300,
    [activeLink]
  );

  return (
    <ConfContext.Provider value={{ activeLink, goToLink, isEventBriteLoaded, sectionsVisibles, setSectionsVisibles }}>
      <Helmet {...helmetConfig.head}>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:url" content="https://api-platform.com/con/2021/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@coopTilleuls" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
        <script type="application/ld+json">{JSON.stringify(eventData)}</script>
        <script defer src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js" />
        <style type="text/css">{`
          body, html {
            background-color: #001226;
          }
    `}</style>
      </Helmet>
      <PreloadFonts />
      <div className="conf conf__layout" id="conf">
        <div className="conf__background" />
        <Nav location={location} />
        <MobileNav />
        <div className="conf__content">
          {children}
          <Footer />
        </div>
      </div>
    </ConfContext.Provider>
  );
};

export default Layout;
