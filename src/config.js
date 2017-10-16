require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  dataPath: process.env.DATA_PATH || 'data',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'API Platform: API-first PHP framework for modern web projects',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'API Platform: %s',
      meta: [
        {name: 'description', content: 'A PHP framework dedicated to hypermedia API creation, auto generate api from entities.'},
        {name: 'keywords', content: 'PHP framework, Api First Framework, auto generate api from entities, auto generate admin.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'API Platform'},
        {property: 'og:image', content: '/logo.png'},
        {property: 'og:image:type', content: 'image/png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'API Platform'},
        {property: 'og:description', content: 'A PHP framework dedicated to hypermedia API creation, auto generate api from entities.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@ApiPlatform'},
        {property: 'og:creator', content: '@dunglas'},
        {property: 'og:image:width', content: '500'},
        {property: 'og:image:height', content: '500'}
      ]
    }
  },

}, environment);
