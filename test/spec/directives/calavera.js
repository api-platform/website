'use strict';

describe('Directive: calavera', function () {

  // load the directive's module
  beforeEach(module('apiPlatformWebsite'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<calavera></calavera>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the calavera directive');
  }));
});
