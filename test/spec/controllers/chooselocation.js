'use strict';

describe('Controller: ChooselocationCtrl', function () {

  // load the controller's module
  beforeEach(module('roommatesApp'));

  var ChooselocationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChooselocationCtrl = $controller('ChooselocationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
