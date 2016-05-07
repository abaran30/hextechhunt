angular.module('hextechhuntClientApp')
  .service('HextechHuntService', function($http, $q, ProxyHostResolverService) {
    var baseProxyUrl = ProxyHostResolverService.getBaseProxyUrl(); // Get the URL for the proxy server

    // Array of available regions
    var availableRegions = [
      {id: 'NA', name: 'NA'},
      {id: 'EUNE', name: 'EU Nordic & East'},
      {id: 'EUW', name: 'EU West'},
      {id: 'BR', name: 'Brazil'},
      {id: 'JP', name: 'Japan'},
      {id: 'KR', name: 'Korea'},
      {id: 'LAN', name: 'Latin America North'},
      {id: 'LAS', name: 'Latin America South'},
      {id: 'OCE', name: 'Oceania'},
      {id: 'RU', name: 'Russia'},
      {id: 'TR', name: 'Turkey'}
    ];

    // Object of platform IDs mapped by region
    var platforms = {
      'NA': 'NA1',
      'EUNE': 'EUN1',
      'EUW': 'EUW1',
      'BR': 'BR1',
      'JP': 'JP1',
      'KR': 'KR',
      'LAN': 'LA1',
      'LAS': 'LA2',
      'OCE': 'OC1',
      'RU': 'RU',
      'TR': 'TR1'
    }

    // Get the array of available regions
    this.getAvailableRegions = function() {
      return availableRegions;
    };

    // Get the list of current Champions
    this.getChampions = function(region) {
      var requestUrl = baseProxyUrl + '/api/lol/static-data/' + region + '/v1.2/champion';

      return httpGet(requestUrl)
    };

    // Get a list of Champion Mastery entries for the provided Summoner
    this.getChampionMasteryEntries = function(platformId, summonerId) {
      var requestUrl = baseProxyUrl + '/championmastery/location/' + platformId + '/player/' + summonerId + '/champions';

      return httpGet(requestUrl);
    }

    // Get the platform ID for the provided region
    this.getPlatformId = function(region) {
      return platforms[region];
    }

    // Get Summoner info for the provided Summoner name
    this.getSummoner = function(region, summonerName) {
      var requestUrl = baseProxyUrl + '/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName;

      return httpGet(requestUrl);
    };

    // Get Summoner rank for the provided Summoner
    this.getSummonerRank = function(region, summonerId) {
      var requestUrl = baseProxyUrl + '/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerId + '/entry';

      return httpGet(requestUrl);
    };

    // Helper method to make HTTP calls, with promises
    function httpGet(requestUrl) {
      var deferred = $q.defer();

      $http.get(requestUrl)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
  });
