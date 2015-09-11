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
              controller: 'DownloadCtrl',
              templateUrl: 'views/download.html',
              title: 'Download - API Platform'
          })
          .state('support', {
              url: '/support',
              templateUrl: 'views/support.html',
              title: 'Support - API Platform'
          })
          .state('demo', {
              url: '/demo',
              templateUrl: 'views/demo.html',
              title: 'Demonstration - API Platform'
          })
          .state('doc', {
              url: '/doc/{path:.*}',
              controller: 'DocCtrl',
              templateUrl: 'views/doc.html'
          })
      ;
  });
