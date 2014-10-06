'use strict';

/**
 * @ngdoc filter
 * @name roommatesApp.filter:range
 * @function
 * @description
 * # range
 * Filter in the roommatesApp.
 */
angular.module('roommatesApp')
	.filter('range', function() {
	  return function(val, range) {
	    range = parseInt(range);
	    for (var i=0; i<range; i++)
	      val.push(i);
	    return val;
	  };
	});
