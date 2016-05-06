// TODO: I am not a fan of this implementation, but for now, I cannot think of a better way to resolve the proxy URL without dismantling the established
// control-flow...
angular.module('hextechhuntClientApp')
  .service('ProxyHostResolverService', function($http, $location) {
    // Get the appropriate proxy URL to communicate with the HextechHunt Server
    this.getBaseProxyUrl = function() {
      var currentHost = $location.host();

      if (currentHost === 'localhost') {
        return 'http://localhost:3030'; // Return the localhost address
      } else {
        return 'http://104.236.80.122:3030'; // Return the demo deployment address
      }
    };
  });
