'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
    .controller('HeaderCtrl', function ($scope, $document, $location, $timeout, $state, $anchorScroll) {
        var scrollSpy = function () {
            $timeout(function () {
                $scope.reducedClass = $document.scrollTop() <= 0 ? '' : 'reduced';
            });
        };

        $scope.$on('$stateChangeSuccess', function () {
            // Remove previous listener
            $document.off('scroll', scrollSpy);

            if ('homepage' === $state.current.name) {
                $timeout(function () {
                    $scope.reducedClass = '';
                    $anchorScroll();
                });

                $document.on('scroll', scrollSpy);
            } else {
                $timeout(function () {
                    $scope.reducedClass = 'reduced';
                });
            }
        });
    });
