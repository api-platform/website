import React, { createContext } from 'react';
import dayjs from 'dayjs';
import '@styles/components/con/index.scss';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import MobileNav from '@components/con/layout/MobileNav';
import Nav from '@con/layout/Nav';
import Footer from '@con/layout/Footer';
import PreloadFonts from '@con/layout/Fonts';
import Helmet from 'react-helmet';
import { DESCRIPTION, TITLE, OG_IMAGE, URL } from '@con/data/meta';
import { Navigation } from '@con/types';
import nav from '@con/data/nav';
import helmetConfig from '../../../helmetConfig';

dayjs.extend(localizedFormat);

interface ConfContextInterface {
  nav: Navigation;
  activeLink?: string;
}

export const ConfContext = createContext<ConfContextInterface>(null);

interface LayoutProps {
  logoAlwaysVisible?: boolean;
  edition?: string;
}

const Layout: React.ComponentType<LayoutProps> = ({ children, logoAlwaysVisible = false, edition }) => {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/con/',
  };

  return (
    <ConfContext.Provider value={{ nav }}>
      <PreloadFonts />
      <Helmet {...helmetConfig.head}>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
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
        <script defer src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js" />
        <style type="text/css">{`
          body, html {
            background-color: #001226;
          }
    `}</style>
      </Helmet>
      <div className="conf conf__layout">
        <div className="conf__background" />
        <Nav logoAlwaysVisible={logoAlwaysVisible} edition={edition} />
        <MobileNav />
        <div className="conf__content">{children}</div>
        <Footer />
      </div>
    </ConfContext.Provider>
  );
};

export default Layout;
