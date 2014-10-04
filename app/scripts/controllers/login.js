'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('LoginCtrl', function ($scope, $firebase, $firebaseSimpleLogin) {
	  	var ref = new Firebase("https://housemates.firebaseio.com");
	  	console.log(ref);
	  	var authClient = $firebaseSimpleLogin(ref);

  	$scope.facebookLogin = function() {
  		authClient.$login('facebook').then(function(user) {
  			console.log('username is '+user.uid);
  		}, function(error) {

  		});
	 };
  });
