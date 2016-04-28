angular.module('hextechhuntClientApp')
.controller('SearchController',
  function ($scope, $location, HextechHuntService) {
    $scope.availableRegions = HextechHuntService.getAvailableRegions(); // Get list of available regions to display in the view
    $scope.selectedRegion = $scope.availableRegions[0]; // Set the default region to the first region from availableRegions

    $scope.hunt = function(selectedRegion, summonerName) {
      HextechHuntService.getSummoner(selectedRegion.id, summonerName)
        .then(function(response) {
          location.href = '#/results/' + selectedRegion.id + '/' + summonerName;
        }).catch(function(response) {
          $scope.errorMessage = response.data;
        });
    };
  });
