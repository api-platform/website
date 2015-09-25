'use strict';

/**
 * @ngdoc function
 * @name apiPlatformWebsite.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the apiPlatformWebsite
 */
angular.module('apiPlatformWebsite')
    .controller('LayoutCtrl', function ($scope, $window, $document, $location, $timeout, $state, $anchorScroll) {
        var scrollSpy = function () {
            $timeout(function () {
                $scope.reducedClass = $document.scrollTop() <= 0 ? '' : 'reduced';
            });
        };

        var adaptFooter = function () {
            var $footer = angular.element($document[0].getElementById('footer'));

            if (!$document[0].getElementById('news') && $document[0].body.offsetHeight < $window.innerHeight) {
                $footer.addClass('fixed-footer');
            } else {
                $footer.removeClass('fixed-footer');
            }
        };

        $scope.$on('calaveraDocReady', adaptFooter);

        $scope.$on('$stateChangeSuccess', function () {
            // Fix the footer for small pages
            $timeout(adaptFooter);

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
