angular.module('hextechhuntClientApp')
  .controller('ResultsController',
    function ($scope, $routeParams, CanvasLoaderService, HextechHuntService) {
      $scope.summonerName = $routeParams.summonerName;
      $scope.region = $routeParams.region;
      $scope.summonerId = $routeParams.summonerId;
      $scope.summonerIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/' + $routeParams.profileIconId + '.png';
      $scope.summonerLevel = $routeParams.summonerLevel;
      $scope.errorMessage = null;

      var specialChampionsForIconUrl = {
        'ChoGath': 'Chogath',
        'Fiddlesticks': 'FiddleSticks',
        'LeBlanc': 'Leblanc',
        'KhaZix': 'Khazix',
        'VelKoz': 'Velkoz',
        "Wukong": 'MonkeyKing' // Uhm... Oops?
      };

      CanvasLoaderService.showSpinner();

      HextechHuntService.getSummonerRank($scope.region, $scope.summonerId)
        .then(function(response) {
          var tierString = response[$scope.summonerId][0].tier;
          tierString = tierString.toLowerCase();

          var division = response[$scope.summonerId][0].entries[0].division;

          $scope.summonerRank = tierString.charAt(0).toUpperCase() + tierString.slice(1) + ' ' + division;
        }).catch(function(response) {
          $scope.summonerRank = response.data;
        });

      var platformId = HextechHuntService.getPlatformId($scope.region.toUpperCase());
      $scope.championMasteryResults = [];

      HextechHuntService.getChampions($scope.region)
        .then(function(response) {
          var championMap = response.data;

          HextechHuntService.getChampionMasteryEntries(platformId, $scope.summonerId)
            .then(function(response) {
              for (var i = 0; i < response.length; i++) {
                var championId = response[i]['championId'];
                var championName = championMap[championId.toString()].name;
                var championMasteryLevel = response[i]['championLevel'];
                var championMasteryPoints = response[i]['championPoints'];
                var highestGradeEarned = response[i]['highestGrade'];
                var hextechChestRewarded = response[i]['chestGranted'];

                // Adjust the Champion's name in order to get the correct URL for the Champion's (square) icon
                var strippedChampionName = championName.replace(/\W+/g, '');

                if (specialChampionsForIconUrl[strippedChampionName]) {
                  strippedChampionName = specialChampionsForIconUrl[strippedChampionName];
                }

                var championIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/' + strippedChampionName + '.png';

                // Analyze the Champion Mastery and determine whether or not the Champion has significant potential to award the player with a Hextech Chest
                // in the near future (if a Chest has not been rewarded already)
                var hextechChestRewardedIcon = 'images/checkmark.png'; // Default,

                if (!hextechChestRewarded) {
                  if (championMasteryLevel >= 4 && (highestGradeEarned === 'A' || highestGradeEarned === 'A+')) {
                    hextechChestRewardedIcon = 'images/asterisk.png';
                  } else {
                    hextechChestRewardedIcon = 'images/x.png';
                  }
                }

                var championMasteryResultsObject = {
                  'championIconSrc': championIconSrc,
                  'championName': championName,
                  'championMasteryLevel': championMasteryLevel,
                  'championMasteryPoints': championMasteryPoints,
                  'highestGradeEarned': highestGradeEarned,
                  'hextechChestRewarded': hextechChestRewardedIcon
                };

                $scope.championMasteryResults.push(championMasteryResultsObject);

                CanvasLoaderService.hideSpinner();
              }
            }).catch(function(response) {
              $scope.errorMessage = response.data;
            });
        }).catch(function(response) {
          $scope.errorMessage = response.data;
        });

      $scope.returnToSearch = function() {
        location.href = '#/search';
      };
    });
