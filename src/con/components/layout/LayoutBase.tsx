import React from 'react';
import dayjs from 'dayjs';
import Helmet from 'react-helmet';
import Nav from '@con/components/layout/Nav';
import MobileNav from '@con/components/layout/MobileNav';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PreloadFonts from '@con/components/layout/Fonts';
import helmetConfig from '../../../helmetConfig';
import Footer, { FooterColumn } from './Footer';

interface LayoutProps {
  logoAlwaysVisible?: boolean;
  meta: {
    DESCRIPTION: string;
    TITLE: string;
    OG_IMAGE: string;
    URL: string;
  };
  edition: string;
  footer: FooterColumn[];
  withSocialFooter?: boolean;
}

const LayoutBase: React.ComponentType<LayoutProps> = ({
  logoAlwaysVisible,
  children,
  meta,
  edition,
  footer,
  withSocialFooter = false,
}) => {
  dayjs.extend(localizedFormat);
  const { URL, DESCRIPTION, TITLE, OG_IMAGE } = meta;

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'API Platform Conference',
    url: 'https://api-platform.com/con/2021/',
  };

  return (
    <>
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
      <PreloadFonts />
      <div className="conf conf__layout" id="conf">
        <div className="conf__background" />
        <Nav logoAlwaysVisible={logoAlwaysVisible} edition={edition} />
        <MobileNav />
        <div className="conf__content">
          {children}
          <Footer links={footer} withSocial={withSocialFooter} />
        </div>
      </div>
    </>
  );
};

export default LayoutBase;
