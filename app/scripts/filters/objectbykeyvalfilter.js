'use strict';

/**
 * @ngdoc filter
 * @name roommatesApp.filter:objectByKeyValFilter
 * @function
 * @description
 * # objectByKeyValFilter
 * Filter in the roommatesApp.
 */
angular.module('roommatesApp')
	.filter('objectByKeyValFilter', function () {
	return function (input, filterKey, filterVal) {
	    var filteredInput ={};
	     angular.forEach(input, function(value, key){
	       if(value[filterKey] && value[filterKey] == filterVal){
	          filteredInput[key]= value;
	        }
	     });
	     return filteredInput;
	}});