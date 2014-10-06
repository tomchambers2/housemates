'use strict';

/**
 * @ngdoc service
 * @name roommatesApp.login
 * @description
 * # login
 * Factory in the roommatesApp.
 */
angular.module('roommatesApp')
  .factory('login', function ($firebaseSimpleLogin) {
    var ref = new Firebase("https://housemates.firebaseio.com/");
    return $firebaseSimpleLogin(ref);
  });
