'use strict';

/**
 * @ngdoc service
 * @name roommatesApp.simpleLogin
 * @description
 * # simpleLogin
 * Factory in the roommatesApp.
 */
angular.module('roommatesApp')
  .factory('simpleLogin', ['$firebaseSimpleLogin', function($firebaseSimpleLogin) {
    var ref = new Firebase("https://housemates.firebaseio.com");
    return $firebaseSimpleLogin(ref);
  }]);