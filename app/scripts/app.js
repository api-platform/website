'use strict';

/**
 * @ngdoc overview
 * @name apiPlatformWebsiteClientApp
 * @description
 * # apiPlatformWebsiteClientApp
 *
 * Main module of the application.
 */
angular
  .module('apiPlatformWebsite', ['ui.router', 'duScroll'])
  .value('duScrollOffset', 100)
  .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
          .state('homepage', {
            url: '/',
            templateUrl: 'views/main.html'
          })
      ;
  });
