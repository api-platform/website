/* eslint-disable no-unused-vars */
const fs = require('fs');
const dotenv = require('dotenv').config({ path: '.env.gatsby' });
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'API Platform',
    siteUrl: process.env.GATSBY_ROOT_URL,
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/wallpapers`,
        name: 'wallpapers',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/colouring`,
        name: 'colouring',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/logos`,
        name: 'logos',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/components/con/2021/images/speakers`,
        name: 'speakersImages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/components/con/images/editions`,
        name: 'editionsImages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/special`,
        name: 'special',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1120,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-code-selector',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              scrollOffset: 80,
              zIndex: 9999,
              excludedSelector: '[src$="symfonycasts-player.png"]',
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'API Platform',
        short_name: 'API Platform',
        start_url: '/',
        background_color: '#67cece',
        theme_color: '#38a9b4',
        display: 'standalone',
        lang: 'en',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    // 'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatting: {
          format: 'YYYY',
        },
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-meta-redirect', // make sure this is always the last one
  ],
};
