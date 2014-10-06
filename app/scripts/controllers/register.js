'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('RegisterCtrl', function ($scope, login, $firebase) {
 	$scope.user = login.user;
 	$scope.picture = login.user.thirdPartyUserData.picture.data.url;

	var ref = new Firebase('https://housemates.firebaseio.com/users/');
	var users = $firebase(ref); 	

 	$scope.saveBio = function() {
 		if ($scope.bio) {
    		users.$update(login.user.uid, {
    			bio: $scope.bio
    		}).then(function() {
    			$scope.saved = true;
    		});
    	};
 	}
  });
