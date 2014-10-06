'use strict';

/**
 * @ngdoc overview
 * @name roommatesApp
 * @description
 * # roommatesApp
 *
 * Main module of the application.
 */
angular
  .module('roommatesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'google-maps',
    'firebase',
    'geocoder',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/choosetype', {
        templateUrl: 'views/choosetype.html',
        controller: 'ChoosetypeCtrl'
      })      
      .when('/chooselocation', {
        templateUrl: 'views/chooselocation.html',
        controller: 'ChooselocationCtrl'
      })
      .when('/questions/', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        resolve: {
          'currentUser': ['login', function(login) {
            return login.$getCurrentUser();
          }]
        }
      })
      .when('/matches', {
        templateUrl: 'views/matches.html',
        controller: 'MatchesCtrl'
      })   
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })            
      .otherwise({
        redirectTo: '/'
      });
  });
