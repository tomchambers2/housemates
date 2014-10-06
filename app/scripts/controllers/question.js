'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('QuestionCtrl', function ($scope, $location, $routeParams, $firebase, $localStorage) {
    $scope.selected = {};
    if (!$localStorage.currentQuestion) {
        $localStorage.currentQuestion = 0;
    };
    if (!$localStorage.answers) {
        $localStorage.answers = {};
    };

    var ref = new Firebase('https://housemates.firebaseio.com/questions/');
    var sync = $firebase(ref);

    var questions = sync.$asArray();
    questions.$loaded().then(function() {
        $scope.proceed(false);
    });

    var loadNewQuestion = function(index) {
        $scope.questionText = questions[index].questionText;
        $scope.answers = questions[index].answers;
    }

    $scope.proceed = function(increment) {
        if (increment) {
            $localStorage.currentQuestion++;
        };
        if ($localStorage.currentQuestion < questions.length) {
            $scope.selected = {};
            loadNewQuestion($localStorage.currentQuestion);
        } else {
            $location.path('/login');
        }
    }

    $scope.select = function(index) {
        $scope.selected.any = true;

    	for (var i = 0; i < $scope.answers.length; i++) {
    		$scope.selected[i] = false;
    	}
    	$scope.selected[index] = true;

        $localStorage.answers[questions[$localStorage.currentQuestion].$id] = index;
    }
  });
