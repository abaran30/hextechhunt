angular.module('hextechhuntClientApp')
  .controller('ResultsController',
    function ($scope, $routeParams, HextechHuntService) {
      $scope.summonerName = $routeParams.summonerName;
      $scope.region = $routeParams.region;
      $scope.summonerId = $routeParams.summonerId;
      $scope.summonerIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/' + $routeParams.profileIconId + '.png';
      $scope.summonerLevel = $routeParams.summonerLevel;

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

      HextechHuntService.getChampions()
        .then(function(response) {
          var championMap = response.data;

          HextechHuntService.getChampionMasteryEntries(platformId, $scope.summonerId)
            .then(function(response) {
              for (var i = 0; i < response.length; i++) {
                var championId = response[i]['championId'];
                var championName = championMap[championId.toString()].name;
                var championMasteryLevel = response[i]['championLevel'];
                var championPoints = response[i]['championPoints'];
                var highestGradeEarned = response[i]['highestGrade'];
                var hextechChestRewarded = response[i]['chestGranted'];

                var championMasteryResultsObject = {};

                championMasteryResultsObject[championId] = {
                  'championIconSrc': 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/' + championName + '.png',
                  'championName': championName,
                  'championMasteryLevel': championMasteryLevel,
                  'championPoints': championPoints,
                  'highestGradeEarned': highestGradeEarned,
                  'hextechChestRewarded': hextechChestRewarded
                };

                $scope.championMasteryResults.push(championMasteryResultsObject);
              }
            }).catch(function(response) {
              // TODO: Handle error
            });
        }).catch(function(response) {

        });

      $scope.returnToSearch = function() {
        location.href = '#/search';
      };

      // Load the view with a fade-in animation
      $(function () {
          $('#container').hide().fadeIn(300);
      });
    });
