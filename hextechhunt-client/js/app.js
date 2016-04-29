var hextechhuntClientApp = angular.module('hextechhuntClientApp', ['ngRoute']);

hextechhuntClientApp.config(['$routeProvider',
	function ($routeProvider) {
    $routeProvider
      .when('/search', {
		    templateUrl: 'views/search/search.html',
			  controller: 'SearchController'
		  })
      .when('/results/:summonerName/:region/:summonerId/:profileIconId/:summonerLevel', {
        templateUrl: 'views/results/results.html',
        controller: 'ResultsController'
      })
		  .otherwise({
			  redirectTo: '/search'
			});
    }]);
