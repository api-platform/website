import React, { createContext } from 'react';
import dayjs from 'dayjs';
import '@styles/components/con/index.scss';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Nav from '@con/layout/Nav';
import Footer from '@con/layout/Footer';
import PreloadFonts from '@con/layout/Fonts';

dayjs.extend(localizedFormat);

export const ConfContext = createContext(null);

interface LayoutProps {
  location: {
    pathname?: string;
    hash?: string;
  };
}

const Layout: React.ComponentType<LayoutProps> = ({ children }) => {
  return (
    <>
      <PreloadFonts />
      <div className="conf conf__layout">
        <div className="conf__background" />
        <Nav />
        <div className="conf__content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
