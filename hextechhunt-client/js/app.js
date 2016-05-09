var hextechhuntClientApp = angular.module('hextechhuntClientApp', ['ngRoute']);

// Application routing
hextechhuntClientApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			// About
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutController'
			})
			// Results
			.when('/results/:summonerName/:region/:summonerId/:profileIconId/:summonerLevel', {
				templateUrl: 'views/results.html',
				controller: 'ResultsController'
			})
			// Search
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchController'
			})
			// Else --> Search
			.otherwise({
				redirectTo: '/search'
			});
		}]);
