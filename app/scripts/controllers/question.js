'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('QuestionCtrl', function ($scope, $routeParams, $firebase) {
    $scope.qId = parseInt($routeParams.id,10);

    var ref = new Firebase('https://housemates.firebaseio.com/questions/');
    var sync = $firebase(ref);

    var questions = sync.$asObject();
    questions.$loaded().then(function() {
        $scope.questionText = questions.saturdayNight.questionText;
    })

    //load that question from database and populate page
    //check if last question, then link should be to login

    $scope.nextQuestion = function() {
        $scope.qId++;
        $scope.choice = null;
        $scope.choices = null;
        $scope.questionText = 'What is your ideal Saturday night?';
        $scope.questionType = 'choice';
    }

    $scope.questionText = 'What is your ideal Saturday night?';
    $scope.questionType = 'choice';
    $scope.choices = [
    	{
    		id: 1,
    		imagePath: '',		
    	},
    	{
    		id: 2,
    		imagePath: '',		
    	},
    	{
    		id: 3,
    		imagePath: '',		
    	},
    	{
    		id: 4,
    		imagePath: '',		
    	},
    ];

    $scope.select = function(index, id) {
    	//save choice into localstorage
    	$scope.choice = id;

    	for (var i = 0; i < $scope.choices.length; i++) {
    		$scope.choices[i].selected = false;
    	}
    	$scope.choices[index].selected = true;
    }
  });
