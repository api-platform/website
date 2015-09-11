'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
  .controller('NewsCtrl', function ($document, $timeout) {
    $timeout(function () {
        console.log('Wtf');
        twttr.widgets.load();
    });
  });
