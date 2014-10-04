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
      .when('/chooselocation', {
        templateUrl: 'views/chooselocation.html',
        controller: 'ChooselocationCtrl'
      })
      .when('/question/:id', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainCtrl'
      })
      .when('/matches', {
        templateUrl: 'views/matches.html',
        controller: 'MainCtrl'
      })      
      .otherwise({
        redirectTo: '/'
      });
  });
