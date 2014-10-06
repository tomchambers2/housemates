'use strict';

describe('Filter: objectByKeyValFilter', function () {

  // load the filter's module
  beforeEach(module('roommatesApp'));

  // initialize a new instance of the filter before each test
  var objectByKeyValFilter;
  beforeEach(inject(function ($filter) {
    objectByKeyValFilter = $filter('objectByKeyValFilter');
  }));

  it('should return the input prefixed with "objectByKeyValFilter filter:"', function () {
    var text = 'angularjs';
    expect(objectByKeyValFilter(text)).toBe('objectByKeyValFilter filter: ' + text);
  });

});
