'use strict';

/**
 * @ngdoc function
 * @name roommatesApp.controller:ChooselocationCtrl
 * @description
 * # ChooselocationCtrl
 * Controller of the roommatesApp
 */
angular.module('roommatesApp')
  .controller('ChooselocationCtrl', function ($scope, Geocoder) {
    $scope.findLocation = function() {
      Geocoder.geocodeAddress($scope.location).then(function(result) {
        console.log(result);
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
        console.log(error);
      });
    };

    $scope.resetSearch = function() {
      $scope.coords = null;
      $scope.location = '';
    }
  });
