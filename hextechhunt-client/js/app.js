var hextechhuntClientApp = angular.module('hextechhuntClientApp', ['ngRoute']);

hextechhuntClientApp.config(['$routeProvider',
	function ($routeProvider) {
    $routeProvider
      .when('/search', {
		    templateUrl: 'views/search/search.html',
			  controller: 'SearchController'
		  })
      .when('/results/:region/:summonerId', {
        templateUrl: 'views/results/results.html',
        controller: 'ResultsController'
      })
		  .otherwise({
			  redirectTo: '/search'
			});
    }]);

// Load the initial page with a fade-in animation
$(function () {
    $(document.body).hide().fadeIn(300);
});
