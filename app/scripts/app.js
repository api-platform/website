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
  .module('apiPlatformWebsite', ['ngSanitize', 'ui.router', 'duScroll', 'ui.bootstrap'])
  .value('duScrollOffset', 80)
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $stateProvider
          .state('homepage', {
            url: '/',
            templateUrl: 'views/main.html',
            title: 'API Platform: API-first PHP framework for modern web projects'
          })
          .state('download', {
              url: '/download',
              templateUrl: 'views/download.html',
              title: 'Download - API Platform'
          })
          .state('doc', {
              url: '/doc/{path:.*}',
              controller: 'DocCtrl',
              templateUrl: 'views/doc.html'
          })
      ;
  });
