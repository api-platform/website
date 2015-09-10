'use strict';

/**
 * @ngdoc directive
 * @name apiPlatformWebsite.directive:calavera
 * @description
 * # calavera
 */
angular.module('apiPlatformWebsite')
  /* jshint unused: false */
  .directive('calavera', function ($document, $http, $anchorScroll) {
    return {
      template: '<div class="calavera"></div>',
      restrict: 'E',
      scope: {
        jsonld: '=jsonld'
      },
      link: function (scope, element) {
        $http.get(scope.jsonld).then(function (response) {
          // Transform the raw HTML to DOM
          var root = $document[0].createElement('div');
          root.innerHTML = response.data.text;

          // Update the browser title
          $document[0].title = response.data.name + ' - API Platform';

          var $text = angular.element(root);
          // Delete the file name
          var basePath = scope.jsonld.substring(0, scope.jsonld.lastIndexOf('/') + 1);

          // Convert all links pointing to JSON-LD documents
          angular.forEach($text.find('a'), function(element) {
            var $element = angular.element(element);
            var href = $element.attr('href');

            // Convert relative JSON-LD URLs
            if (!/^(?:[a-z]+:)?\/\//i.test(href)) {
              $element.attr('href', basePath + href.replace(/\.jsonld/, ''));
            }
          });

          // Convert all images
          angular.forEach($text.find('img'), function (element) {
            var $element = angular.element(element);
            var href = $element.attr('src');

            // Convert relative URLs
            if (!/^(?:[a-z]+:)?\/\//i.test(href)) {
              $element.attr('src', basePath + href);
            }
          });

          element.append($text);
          Prism.highlightAll();
          anchors.add();
          $anchorScroll();
        }, function (response) {
          if (404 === response.status) {
          } else {
          }
        });
      }
    };
  });
/* jshint unused: true */
