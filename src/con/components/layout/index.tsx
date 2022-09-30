import React, { createContext } from 'react';
import meta from '@con/data/meta';
import { Navigation } from '@con/types';
import baseNav from '@con/data/nav';
import LayoutBase from '@con/components/layout/LayoutBase';
import { previousEditions } from '@con/data/editions';

const previousEditionsMenu = previousEditions.map((edition) => ({
  title: `${edition.year} edition`,
  link: `/con/${edition.year}`,
}));

interface ConfContextInterface {
  nav?: Navigation;
  activeLink?: string;
  edition?: string;
  isEventBriteLoaded?: boolean;
}

export const ConfContext = createContext<ConfContextInterface>({ edition: '2022' });

interface LayoutProps {
  logoAlwaysVisible?: boolean;
  edition?: string;
  children: React.ReactNode;
  nav?: typeof baseNav;
}

const landingFooter = [
  {
    title: 'Previous editions',
    links: previousEditionsMenu,
  },
];

const Layout: React.ComponentType<LayoutProps> = ({ children, logoAlwaysVisible = false, edition, nav = baseNav }) => {
  return (
    <ConfContext.Provider value={{ nav, edition }}>
      <LayoutBase
        logoAlwaysVisible={logoAlwaysVisible}
        edition={edition}
        meta={meta}
        footer={landingFooter}
        withSocialFooter
      >
        {children}
      </LayoutBase>
    </ConfContext.Provider>
  );
};

export default Layout;
