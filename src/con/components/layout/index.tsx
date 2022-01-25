import React, { createContext } from 'react';
import meta from '@con/data/meta';
import { Navigation } from '@con/types';
import nav from '@con/data/nav';
import LayoutBase from '@con/components/layout/LayoutBase';

interface ConfContextInterface {
  nav?: Navigation;
  activeLink?: string;
  edition?: string;
}

export const ConfContext = createContext<ConfContextInterface>({ edition: '2022' });

interface LayoutProps {
  logoAlwaysVisible?: boolean;
  edition?: string;
}

const landingFooter = [
  {
    title: 'Previous editions',
    links: [
      {
        title: '2021 archive',
        link: '/con/2021',
      },
      {
        title: '2021 review',
        link: '/con/2021/review',
      },
    ],
  },
];

const Layout: React.ComponentType<LayoutProps> = ({ children, logoAlwaysVisible = false, edition }) => {
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
