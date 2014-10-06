'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('MatchesCtrl', function ($scope, $firebase) {
  	var ref = new Firebase('https://housemates.firebaseio.com/');
    var matches = $firebase(ref.child('matches'));
    var users = $firebase(ref.child('users'));

    $scope.user = {
      uid: 'facebook:1547041612178501'
    }

    $scope.matches = matches.$asArray();

    $scope.users = users.$asObject();

    $scope.emailMatch = function() {
    	//drop a modal which on firing calls the mandrill service to send an email
    };

    $scope.rejectMatch = function() {
    	//not implemented until node ml stuff is done
    	//update row in matches to say 'bad' match and don't load again
    };
  });
