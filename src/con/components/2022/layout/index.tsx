import React, { useState, useMemo, useEffect, PropsWithChildren } from 'react';
import dayjs from 'dayjs';
import Helmet from 'react-helmet';
import nav from '@con/data/2022/nav';
import footer from '@con/data/2022/footer';
import prices from '@con/data/2022/prices';
import { ConfContext } from '@con/components/layout';
import SectionsContext from '@con/contexts/SectionsContext';
import { useLocation } from '@reach/router';
import meta from '@con/data/2022/meta';
import LayoutBase from '@con/components/layout/LayoutBase';
import BuyButton from '@con/components/2022/BuyButton';

interface LayoutProps extends PropsWithChildren {
  logoAlwaysVisible?: boolean;
}

const Layout: React.ComponentType<LayoutProps> = ({ logoAlwaysVisible, children }) => {
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
      availability: 'https://schema.org/SoldOut',
      price: `${activeOffer.price}.00`,
      name: 1 === price.offers.length ? price.title : `${price.title} - ${activeOffer.title}`,
      priceCurrency: 'EUR',
      url: 'https://www.eventbrite.fr/e/api-platform-conference-2022-tickets-304104152707',
      validFrom: '2022-04-07',
    };
  });

  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'API Platform Conference 2022',
    description: 'The international conference dedicated to API Platform and its ecosystem',
    url: 'https://api-platform.com/con/2022/',
    eventStatus: 'http://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    startDate: '2022-09-15',
    endDate: '2022-09-16',
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
        url: 'https://api-platform.com/con/2022/',
      },
    ],
    image: meta.OG_IMAGE,
    offers: offersData,
  };

  // anchors handler
  const { pathname } = useLocation();
  const [sectionsVisibles, setSectionsVisibles] = useState<string[]>([]);
  const activeLink = useMemo(() => {
    const lastSectionVisible = sectionsVisibles?.[sectionsVisibles.length - 1];
    if (!lastSectionVisible || 'home' === lastSectionVisible) return pathname;
    return sectionsVisibles.length ? `${pathname}#${sectionsVisibles[sectionsVisibles.length - 1]}` : pathname;
  }, [sectionsVisibles, pathname]);

  useEffect(() => {
    window.history.replaceState({}, '', activeLink);
  }, [activeLink]);

  const [isEventBriteLoaded, setIsEventBriteLoaded] = useState(false);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    s.onload = () => {
      setIsEventBriteLoaded(true);
    };
    document.body.appendChild(s);
  }, [setIsEventBriteLoaded]);

  return (
    <ConfContext.Provider value={{ nav, activeLink, edition: '2022', isEventBriteLoaded }}>
      <SectionsContext.Provider value={{ sectionsVisibles, setSectionsVisibles }}>
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(eventData)}</script>
          <script defer src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js" />
        </Helmet>
        <LayoutBase
          edition="2022"
          meta={meta}
          logoAlwaysVisible={logoAlwaysVisible}
          footer={footer}
          navButton={
            <BuyButton className="pink" size="small" id="nav">
              Buy tickets
            </BuyButton>
          }
        >
          {children}
        </LayoutBase>
      </SectionsContext.Provider>
    </ConfContext.Provider>
  );
};

export default Layout;
