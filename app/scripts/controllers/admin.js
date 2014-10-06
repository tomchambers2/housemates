'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('AdminCtrl', function ($scope, $firebase) {
  	var ref = new Firebase('https://housemates.firebaseio.com/questions/');
	var sync = $firebase(ref);  

	var getQuestions = function() {
		$scope.questions = sync.$asObject();
	};

	$scope.removeQuestion = function(key) {
		console.log(key);
		sync.$remove(key);
	};

  	$scope.addQuestion = function() {
	    var ref = new Firebase('https://housemates.firebaseio.com/questions/');
	    var sync = $firebase(ref);  		

	    var question = {
	    	questionText: $scope.question.questionText,
	    	questionType: $scope.question.questionType,
	    	answers: $scope.question.answers
	    }

	    sync.$push(question);

	    $scope.message = 'Saved new question';

	    $scope.question = {};
  	};

  	getQuestions();
  });
