'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:DownloadCtrl
 * @description
 * # DownloadCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
  .controller('DownloadCtrl', function ($scope, $window, $document) {
      $scope.copy = function () {
        var elem = $document[0].getElementById('command');
        elem.select();

        try {
          if (!$document[0].execCommand('copy')) {
            $window.alert('Unable to copy. Do it manually.');
          }
        } catch (err) {
          $window.alert('Unable to copy. Do it manually.');
        }
      };
    });
