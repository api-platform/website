'use strict';

angular.module('apiPlatformWebsite')
    .controller('DocCtrl', function ($scope, $location, $anchorScroll) {
        var path = $location.path();

        // Compute the JSON-LD document URL
        if ('/doc/' === path) {
            $scope.file = '/doc/1.0/index.jsonld';
        } else {
            $scope.file = path + '.jsonld';
        }

        // JSON support
        Prism.languages.json = Prism.languages.javascript;

        // Fixed header
        $anchorScroll.yOffset = 100;
    });
