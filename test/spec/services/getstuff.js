'use strict';

describe('Service: getStuff', function () {

  // load the service's module
  beforeEach(module('roommatesApp'));

  // instantiate service
  var getStuff;
  beforeEach(inject(function (_getStuff_) {
    getStuff = _getStuff_;
  }));

  it('should do something', function () {
    expect(!!getStuff).toBe(true);
  });

});
