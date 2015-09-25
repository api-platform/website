'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
  .controller('NewsCtrl', function ($scope, $document, $timeout) {
    $timeout(function () {
        twttr.widgets.load();
    });
  });
