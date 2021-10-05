import React, { createContext } from 'react';
import dayjs from 'dayjs';
import '@styles/components/con/index.scss';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Nav from '@con/layout/Nav';
import Footer from '@con/layout/Footer';
import PreloadFonts from '@con/layout/Fonts';
import { Navigation } from '@con/types';
import nav from '@con/data/nav';

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
  return (
    <ConfContext.Provider value={{ nav }}>
      <PreloadFonts />
      <div className="conf conf__layout">
        <div className="conf__background" />
        <Nav logoAlwaysVisible={logoAlwaysVisible} edition={edition} />
        <div className="conf__content">{children}</div>
        <Footer />
      </div>
    </ConfContext.Provider>
  );
};

export default Layout;
