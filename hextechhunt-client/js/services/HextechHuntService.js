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

    this.getPlatformId = function(region) {
      return platforms[region];
    }

    this.getSummoner = function(region, summonerName) {
      var deferred = $q.defer();

      $http.get(baseProxyUrl + '/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    this.getSummonerRank = function(region, summonerId) {
      var deferred = $q.defer();

      $http.get(baseProxyUrl + '/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerId + '/entry')
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
  });
