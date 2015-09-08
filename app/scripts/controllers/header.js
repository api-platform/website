'use strict';

angular.module('apiPlatformWebsite')
    .controller('HeaderCtrl', function ($scope, $document, $location) {
        if ('/' === $location.path()) {
            $document.on('scroll', function () {
                $scope.reducedClass = $document.scrollTop() <= 0 ? '' : 'reduced';
                $scope.$apply();
            });
        } else {
            $scope.reducedClass = 'reduced';
        }
    });
