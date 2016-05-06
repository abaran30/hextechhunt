'use strict';

var express = require('express');
var request = require('request');
var app = express();

var hostAddress = process.argv.slice(2)[0]; // Host address

if (!hostAddress) {
  hostAddress = 'localhost'; // If no host address has been provided, set the default to "localhost"
}

var riotApiKey = process.env.RIOT_API_KEY; // My development API key

// Express middleware
app.use('/', function(req, res, next) {
  // Application headers
  res.setHeader('Access-Control-Allow-Origin', 'http://' + hostAddress + ':8080'); // Allow connection from the host only
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow GET request methods only
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Allow X-Requested-With and content-type request headers
  next(); // Continue
});

// Proxy for GET /championmastery/location/{platformId}/player/{summonerId}/champions
// This will: "Get all champion mastery entries sorted by number of champion points descending (RPC)"
app.get('/championmastery/location/:platformId/player/:summonerId/champions', function(req, res, next) {
  var platformId = req.params.platformId; // Platform ID parameter
  var summonerId = req.params.summonerId; // Summoner ID parameter

  var requestUrl = 'https://na.api.pvp.net/championmastery/location/' + platformId + '/player/' + summonerId + '/champions?api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) { // Success - send the response
      res.statusCode = 200;
      res.send(body);
    } else { // Error - send generic error message
      res.statusCode = 500; // There's not much that the user can do to rectify the supported error codes, so send a 500 for all errors
      res.send('Uh-oh, something went wrong. Please try again later.');
    }
  });
});

// Proxy for GET /api/lol/{region}/v2.5/league/by-summoner/{summonerId}/entry
// This will: "Get league entries mapped by summoner ID for a given list of summoner IDs. (REST)"
app.get('/api/lol/:region/v2.5/league/by-summoner/:summonerId/entry', function(req, res, next) {
  var region = req.params.region; // Region parameter
  var summonerId = req.params.summonerId; // Summoner ID parameter

  var requestUrl = 'https://na.api.pvp.net/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerId + '/entry?api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) { // Success - send the response
      res.statusCode = 200;
      res.send(body);
    } else { // Error - a 404 would indicate that no rank/league has been found for the Summoner, hence an empty string is sent
      res.statusCode = 404;
      res.send('');
    }
  });
});

// Proxy for GET /api/lol/{region}/v1.4/summoner/by-name/{summonerName}
// This will: "Get summoner objects mapped by standardized summoner name for a given list of summoner names. (REST)"
app.get('/api/lol/:region/v1.4/summoner/by-name/:summonerName', function(req, res, next) {
  var region = req.params.region; // Region parameter
  var summonerName = req.params.summonerName; // Summoner name parameter

  var requestUrl = 'https://na.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName + '?api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) { // Success - send the response
      res.statusCode = 200;
      res.send(body);
    } else if (response.statusCode === 404) { // Error (404) - Summoner has not been found, send an error message explaining so
      res.statusCode = 404;
      res.send('Oops! Summoner has not been found...');
    } else { // Error (misc. error code) - send generic error message
      res.statusCode = 500;
      res.send('Uh-oh, something went wrong. Please try again later.');
    }
  });
});

// Proxy for GET /api/lol/static-data/{region}/v1.2/champion?dataById=true
// This will: "Retrieves champion list. (REST)"
app.get('/api/lol/static-data/:region/v1.2/champion', function(req, res, next) {
  var region = req.params.region; // Region parameter

  var requestUrl = 'https://global.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion?dataById=true&api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) { // Success - send the response
      res.statusCode = 200;
      res.send(body);
    } else { // Error - send generic error message
      res.statusCode = 500; // There's not much that the user can do to rectify the supported error codes, so send a 500 for all errors
      res.send('Uh-oh, something went wrong. Please try again later.');
    }
  });
});

// Start listening
// "Stay awhile and listen." -Deckard Cain
app.listen(3030, hostAddress, function() {
  console.log('HextechHunt (Server) started at http://' + hostAddress + ':3030');
});
