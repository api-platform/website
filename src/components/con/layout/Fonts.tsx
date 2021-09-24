import React from 'react';
import Helmet from 'react-helmet';

const PreloadFonts: React.ComponentType = () => (
  <Helmet>
    <link rel="preload" as="font" href="/fonts/poppins-v15-latin-300.woff2" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" as="font" href="/fonts/poppins-v15-latin-600.woff2" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" as="font" href="/fonts/poppins-v15-latin-800.woff2" crossOrigin="anonymous" />
    <link
      rel="preload"
      as="font"
      href="/fonts/poppins-v15-latin-regular.woff2"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      as="font"
      href="/fonts/raleway-v19-latin-regular.woff2"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link rel="preload" as="font" href="/fonts/raleway-v19-latin-700.woff2" type="font/woff2" crossOrigin="anonymous" />
  </Helmet>
);

export default PreloadFonts;
