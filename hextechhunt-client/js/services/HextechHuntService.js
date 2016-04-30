angular.module('hextechhuntClientApp')
  .service('HextechHuntService', function($http, $q) {
    var baseProxyUrl = 'http://localhost:3030';

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

    this.getAvailableRegions = function() {
      return availableRegions;
    };

    this.getChampions = function() {
      var requestUrl = baseProxyUrl + '/api/lol/static-data/na/v1.2/champion';

      return httpGet(requestUrl)
    };

    this.getChampionMasteryEntries = function(platformId, summonerId) {
      var requestUrl = baseProxyUrl + '/championmastery/location/' + platformId + '/player/' + summonerId + '/champions';

      return httpGet(requestUrl);
    }

    this.getPlatformId = function(region) {
      return platforms[region];
    }

    this.getSummoner = function(region, summonerName) {
      var requestUrl = baseProxyUrl + '/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName;

      return httpGet(requestUrl);
    };

    this.getSummonerRank = function(region, summonerId) {
      var requestUrl = baseProxyUrl + '/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerId + '/entry';

      return httpGet(requestUrl);
    };

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
