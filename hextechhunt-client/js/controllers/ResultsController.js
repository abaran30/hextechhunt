angular.module('hextechhuntClientApp')
.controller('ResultsController',
  function ($scope, $routeParams) {
    $scope.summonerName = $routeParams.summonerName;
    $scope.region = $routeParams.region;
    $scope.summonerId = $routeParams.summonerId;
    $scope.summonerIconSrc = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/' + $routeParams.profileIconId + '.png';
    $scope.summonerLevel = $routeParams.summonerLevel;

    $scope.returnToSearch = function() {
      location.href = '#/search';
    };

    // Load the view with a fade-in animation
    $(function () {
        $('#container').hide().fadeIn(300);
    });
  });
