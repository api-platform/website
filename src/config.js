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
    title: 'Calavera',
    description: 'A (static) Single Page Application generator using Markdown files.',
    head: {
      titleTemplate: 'Calavera: %s',
      meta: [
        {name: 'description', content: 'A (static) Single Page Application generator using Markdown files.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Calavera'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Calavera'},
        {property: 'og:description', content: 'A (static) Single Page Application generator using Markdown files.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@dunglas'},
        {property: 'og:creator', content: '@dunglas'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
