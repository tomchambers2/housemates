'use strict';

describe('Service: createMatches', function () {

  // load the service's module
  beforeEach(module('roommatesApp'));

  // instantiate service
  var createMatches;
  beforeEach(inject(function (_createMatches_) {
    createMatches = _createMatches_;
  }));

  it('should do something', function () {
    expect(!!createMatches).toBe(true);
  });

});
