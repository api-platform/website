'use strict';

describe('Controller: NewsCtrl', function () {

  // load the controller's module
  beforeEach(module('apiPlatformWebsite'));

  var NewsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsCtrl = $controller('NewsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
