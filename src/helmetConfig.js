export default {
  head: {
    titleTemplate: 'API Platform: %s',
    defaultTitle: 'API Platform',
    meta: [
      {
        name: 'description',
        content: 'REST and GraphQL framework on top of Symfony and React',
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
        content: 'REST and GraphQL framework on top of Symfony and React',
      },
      { property: 'og:site', content: '@ApiPlatform' },
      { property: 'og:creator', content: '@dunglas' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/apple-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/apple-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/apple-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/apple-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/apple-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon-180x180.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-icon-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '36x36',
        href: '/android-icon-36x36.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/android-icon-96x96.png',
      },
    ],
  },
};
