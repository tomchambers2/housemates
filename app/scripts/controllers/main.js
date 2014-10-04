'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll) {
  	$scope.scrollTo = function(id) {
  		$location.hash(id);
  		$anchorScroll();
  	}
  });
