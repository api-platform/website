export default {
  head: {
    titleTemplate: '%s - API Platform',
    defaultTitle: 'API Platform',
    meta: [
      {
        name: 'description',
        content: 'The API-first framework: REST, GraphQL and real-time',
      },
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#38a9b4' },
      { property: 'og:site_name', content: 'API Platform' },
      {
        property: 'og:image',
        content: `${process.env.GATSBY_ROOT_URL}/logo.png`,
      },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'API Platform' },
      {
        property: 'og:description',
        content: 'The API-first framework: REST, GraphQL and real-time',
      },
      { property: 'og:site', content: '@ApiPlatform' },
      { property: 'og:creator', content: '@dunglas' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'twitter:site', content: '@ApiPlatform' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/icon.svg',
      },
    ],
  },
};
