angular.module('hextechhuntClientApp')
.controller('ResultsController',
  function ($scope, $routeParams) {
    $scope.summonerId = $routeParams.summonerId;

    $scope.returnToSearch = function() {
      location.href = '#/search';
    };
  });
