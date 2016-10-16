#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__PRISMJS_LANGUAGES__ = ['yaml', 'php', 'json', 'javascript'];
global.__GITHUB_DOCUMENTATION_REPOSITORY__ = process.env.CALAVERA_GITHUB_DOCUMENTATION_REPOSITORY;
global.__GITHUB_DOCUMENTATION_BRANCH__ = process.env.CALAVERA_GITHUB_DOCUMENTATION_BRANCH || 'master';
global.__GOOGLE_ANALYTICS_ID__ = process.env.CALAVERA_GOOGLE_ANALYTICS_ID || null;

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, function() {
    require('../src/server');
  });
