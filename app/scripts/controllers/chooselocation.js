'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:ChooselocationCtrl
 * @description
 * # ChooselocationCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('ChooselocationCtrl', function ($scope, $localStorage, $timeout, $location, Geocoder) {
    var flashMessage = function(message) {
      $scope.message = message;
      $timeout(function() {
        $scope.message = null;
      }, 3000);
    }

    $localStorage.type = 'househunter'

    $scope.findLocation = function() {
      Geocoder.geocodeAddress($scope.location).then(function(result) {
        $scope.coords = {
          lat: result.lat,
          lng: result.lng
        };

        $scope.map = {
          center: {
            latitude: result.lat,
            longitude: result.lng
          },
          zoom: 12
        };
        $scope.circle = {
          id: 1,
          center: {
            latitude: result.lat,
            longitude: result.lng
          },
          radius: 500,
          stroke: {
            color: '#000',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#000',
            opacity: 0.5
          },
          draggable: true,
          editable: true
        };        

      }, function(error) {
        flashMessage('Sorry we couldn\'t find that address');
      });
    };

    $scope.submitLocation = function() {
      $localStorage.location = {
        lat: $scope.circle.center.latitude,
        lng: $scope.circle.center.longitude,
        radius: $scope.circle.radius,
      }
      $location.path('/questions/')
    };

    $scope.resetSearch = function() {
      $scope.coords = null;
      $scope.location = '';
    }
  });
