angular.module('hextechhuntClientApp')
  .controller('SearchController',
    function ($scope, $location, HextechHuntService) {
      $scope.availableRegions = HextechHuntService.getAvailableRegions(); // Get list of available regions to display in the view
      $scope.selectedRegion = $scope.availableRegions[0]; // Set the default region to the first region from availableRegions

      // On-click handler for the Search button
      $scope.search = function(selectedRegion, summonerName) {
        var lowerCasedRegion = selectedRegion.id.toLowerCase(); // Get the region's ID and make it lowercase for a more reliable search
        var strippedSummonerName = summonerName.replace(/\s+/g, '').toLowerCase(); // Strip the Summoner name of whitespace for a more reliable search

        // Get Summoner information
        HextechHuntService.getSummoner(lowerCasedRegion, strippedSummonerName)
          .then(function(response) {
            var summonerObject = response[strippedSummonerName]; // Get the response data object of the Summoner

            // Navigate to the Results view, while passing in the Summoner's name, region, Summoner's ID, Summoner's profile icon ID, and Summoner's level as
            // parameters
            location.href = '#/results/' + summonerObject.name + '/' + lowerCasedRegion + '/' + summonerObject.id + '/' + summonerObject['profileIconId'] + '/'
              + summonerObject['summonerLevel'];
          }).catch(function(response) {
            $('.error-text').hide();
            $scope.errorMessage = response.data; // Error, display the message in the Search view
            $('.error-text').fadeIn(300);
          });
      };

      // Load the view with a fade-in animation
      $(function() {
          $('#view-container').hide().fadeIn(300);
      });
    });
