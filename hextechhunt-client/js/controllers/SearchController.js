angular.module('hextechhuntClientApp')
.controller('SearchController',
  function ($scope, $location, HextechHuntService) {
    $scope.availableRegions = HextechHuntService.getAvailableRegions(); // Get list of available regions to display in the view
    $scope.selectedRegion = $scope.availableRegions[0]; // Set the default region to the first region from availableRegions

    $scope.hunt = function(selectedRegion, summonerName) {
      HextechHuntService.getSummoner(selectedRegion.id, summonerName)
        .then(function(response) {
          var summonerObject = response[summonerName];

          location.href = '#/results/' + summonerObject.name + '/' + selectedRegion.id + '/' + summonerObject.id + '/' + summonerObject['profileIconId'] + '/'
            + summonerObject['summonerLevel'];
        }).catch(function(response) {
          $scope.errorMessage = response.data;
        });
    };

    // Load the view with a fade-in animation
    $(function () {
        $('#container').hide().fadeIn(300);
    });
  });
