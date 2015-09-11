'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:DocCtrl
 * @description
 * # DocCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
    .controller('DocCtrl', function ($scope, $location, $anchorScroll) {
        var path = $location.path();

        // Compute the JSON-LD document URL
        if ('/doc/' === path) {
            $scope.file = '/doc/1.0/index.jsonld';
        } else {
            $scope.file = path + ('/' === path.substring(path.length - 1, path.length) ? 'index' : '')  + '.jsonld';
        }

        // JSON support
        Prism.languages.json = Prism.languages.javascript;

        // Fixed header
        $anchorScroll.yOffset = 100;
    });
