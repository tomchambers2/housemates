'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('LoginCtrl', function ($scope, $localStorage, $firebase, $firebaseSimpleLogin, $location, createMatches) {
	  	var ref = new Firebase("https://housemates.firebaseio.com/users");
      var sync = $firebase(ref);
	  	var authClient = $firebaseSimpleLogin(ref);

    	$scope.facebookLogin = function() {
    		authClient.$login('facebook', { rememberMe: true, scope: 'email' }).then(function(user) {
    			console.log(user);

          //create the users locker with existing data
          sync.$set(user.uid, {
              //email: user.thirdPartyUserData.email,
              gender: user.thirdPartyUserData.gender,
              name: user.thirdPartyUserData.name,
              picture: user.thirdPartyUserData.picture.data.url,
              age_range: user.thirdPartyUserData.age_range,
              location: $localStorage.location,
              answers: $localStorage.answers,
              mainType: $localStorage.mainType,
              subType: $localStorage.subType,
              lastLooking: Date.now()
          });

          createMatches.forUser(user.uid);

          $location.path('/register');
    	});

      //create a row in users for this person with ref to fb id + useful fb info
      //attach their localstorage data (type, location, answers) to that row in users

      //trigger the ml api and start generating matches

      //in register, add their bio data in the same way
	 };
  });
