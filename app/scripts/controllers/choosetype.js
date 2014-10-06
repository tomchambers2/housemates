'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:ChoosetypeCtrl
 * @description
 * # ChoosetypeCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('ChoosetypeCtrl', function ($scope, $location, $localStorage) {
  	$scope.type = '';
  	$scope.form = {
  		wantroom: false,
  		wantbuddy: false
  	};
  	$scope.proceed = false;

    $scope.nextStep = function() {
      $location.path('/chooselocation');
    }

  	$scope.setType = function(mainType) {
  		$scope.mainType = mainType;
  		$localStorage.mainType = mainType;
  		if (mainType === 'hasroom') {
  			$scope.proceed = true;
  		} else if (mainType === 'househunter') {
  			$scope.proceed === false;
  		}
  	};

  	$scope.$watch('form', function(newvalue, oldvalue) {
  		console.log(newvalue);
  		if ($scope.form.wantbuddy === true || $scope.form.wantroom === true) {
  			$scope.proceed = true;
  		} else {
  			$scope.proceed = false;
  		}
  		$localStorage.subType = [{wantbuddy: $scope.form.wantbuddy},{wantroom: $scope.form.wantroom}];
  	}, true);
  });
