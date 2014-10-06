'use strict';

/**
 * @ngdoc service
 * @name roommatesApp.createMatches
 * @description
 * # createMatches
 * Factory in the roommatesApp.
 */
angular.module('roommatesApp')
  .factory('createMatches', function ($http) {
    var forUser = function(uid) {
      $http.get('http://housemates-server.herokuapp.com/?uid='+uid);
    };

    // Public API here
    return {
      forUser: forUser
    };
  });
