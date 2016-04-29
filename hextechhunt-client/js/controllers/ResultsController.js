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

    $scope.returnToSearch = function() {
      location.href = '#/search';
    };

    // Load the view with a fade-in animation
    $(function () {
        $('#container').hide().fadeIn(300);
    });
  });
