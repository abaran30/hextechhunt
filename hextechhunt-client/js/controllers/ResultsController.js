angular.module('hextechhuntClientApp')
  .controller('ResultsController',
    function ($scope, $routeParams, CanvasLoaderService, HextechHuntService) {
      $scope.summonerName = $routeParams.summonerName; // Summoner name
      $scope.region = $routeParams.region; // Summoner's region
      $scope.summonerId = $routeParams.summonerId; // Summoner's ID (player ID)
      $scope.summonerIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/' + $routeParams.profileIconId + '.png'; // Summoner's icon URL
      $scope.summonerLevel = $routeParams.summonerLevel; // Summoner's level
      $scope.errorMessage = null; // Error message that will get populated and displayed in the view if any error occurs with the Service calls here

      // Some Champion keys differ from the spelling of their names, which can cause issues with obtaining Static Data
      // This object contains the known Champions who use a different key for Static Data, i.e. Champion (square) icon
      //
      // TODO: Implement a request to the API to get the correct Champion keys
      var specialChampionsForIconUrl = {
        'ChoGath': 'Chogath',
        'Fiddlesticks': 'FiddleSticks',
        'LeBlanc': 'Leblanc',
        'KhaZix': 'Khazix',
        'VelKoz': 'Velkoz',
        'Wukong': 'MonkeyKing'
      };

      CanvasLoaderService.showSpinner(); // Upon entering the view, display the CanvasLoader to indicate data gathering/loading

      // Get the Summoner's rank
      // If no rank found (404), display nothing underneath the Summoner's region and level
      HextechHuntService.getSummonerRank($scope.region, $scope.summonerId)
        .then(function(response) {
          var tierString = response[$scope.summonerId][0].tier; // Get the rank tier string
          tierString = tierString.toLowerCase(); // Convert the rank tier string to all lowercase

          var division = response[$scope.summonerId][0].entries[0].division; // Get the rank tier division

          $scope.summonerRank = tierString.charAt(0).toUpperCase() + tierString.slice(1) + ' ' + division; // Build the rank string (uppercase first character)
        }).catch(function(response) {
          $scope.summonerRank = response.data; // No rank found, forward empty string
        });

      var platformId = HextechHuntService.getPlatformId($scope.region.toUpperCase()); // Get the platform ID to use for the Champion Mastery service calls

      $scope.championMasteryResults = []; // Initialize array to contain the main results for this view

      // Get the current list of Champions
      HextechHuntService.getChampions($scope.region)
        .then(function(response) {
          var championMap = response.data; // Save the response to a Champion map

          // Get the Summoner's Champion Mastery data
          HextechHuntService.getChampionMasteryEntries(platformId, $scope.summonerId)
            .then(function(response) {
              for (var i = 0; i < response.length; i++) { // For each Champion that the Summoner has Champion Mastery data for
                var championId = response[i]['championId']; // Champion ID
                var championName = championMap[championId.toString()].name; // Champion name
                var championMasteryLevel = response[i]['championLevel']; // Champion Mastery level
                var championMasteryPoints = response[i]['championPoints']; // Champion Mastery points
                var highestGradeEarned = response[i]['highestGrade']; // Highest grade earned with the Champion
                var hextechChestRewarded = response[i]['chestGranted']; // Has a Hextech Chest been granted with this Champion

                // Adjust this Champion's name in order to get the correct URL for the Champion's (square) icon
                var strippedChampionName = championName.replace(/\W+/g, '');

                // If this Champion's name exists in the specialChampionsForIconUrl mapping, get the correct key
                if (specialChampionsForIconUrl[strippedChampionName]) {
                  strippedChampionName = specialChampionsForIconUrl[strippedChampionName];
                }

                var championIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/' + strippedChampionName + '.png'; // Champion icon URL

                // Analyze this Champion Mastery and determine whether or not this Champion has significant potential to award the player with a Hextech Chest
                // in the near future (if a Chest has not been rewarded already)
                var hextechChestRewardedIcon = 'images/checkmark.png'; // Default

                var gradesOfPotential = ['A+', 'S-', 'S', 'S+'];

                if (!hextechChestRewarded) {
                  // The criteria for determining whether this Champion falls under the "potential" case is simple
                  // If this Champion has a Mastery level of 4 or 5, and the highest grade earned with this Champion is an A+, S-, S, or S+, flag it as
                  // having "potential"
                  if (championMasteryLevel >= 4 && (gradesOfPotential.indexOf(highestGradeEarned) > -1)) {
                    hextechChestRewardedIcon = 'images/asterisk.png';
                  } else { // Hextech Chest has not been granted with this Champion, and this Champion does not fall under the "potential" case
                    hextechChestRewardedIcon = 'images/x.png';
                  }
                }

                // Store all of the relevant data in a new object
                var championMasteryResultsObject = {
                  'championIconSrc': championIconSrc,
                  'championName': championName,
                  'championMasteryLevel': championMasteryLevel,
                  'championMasteryPoints': championMasteryPoints,
                  'highestGradeEarned': highestGradeEarned,
                  'hextechChestRewarded': hextechChestRewardedIcon
                };

                $scope.championMasteryResults.push(championMasteryResultsObject); // Add the championMasteryResultsObject to the array of main results
              }

              CanvasLoaderService.hideSpinner(); // The results have been gathered, so hide the CanvasLoader and display the results
            }).catch(function(response) {
              $scope.errorMessage = response.data; // Error, display the message in the Results view
            });
        }).catch(function(response) {
          $scope.errorMessage = response.data; // Error, display the message in the Results view
        });

      // Return the user to the Home (Search) view
      $scope.returnToSearch = function() {
        location.href = '#/search';
      };
    });
