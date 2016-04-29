'use strict';

var express = require('express');
var request = require('request');
var app = express();

var riotApiKey = process.env.RIOT_API_KEY; // My development API key

// Express middleware
app.use('/', function(req, res, next) {
  // Application headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Allow connection from HextechHunt (Client) host
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow GET request methods only
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Allow X-Requested-With and content-type request headers
  next(); // Continue
});

// Proxy for GET /api/lol/:region/v2.5/league/by-summoner/:summonerId
app.get('/api/lol/:region/v2.5/league/by-summoner/:summonerId/entry', function(req, res, next) {
  var region = req.params.region;
  var summonerId = req.params.summonerId;

  var requestUrl = 'https://na.api.pvp.net/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerId + '/entry?api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.statusCode = 200;
      res.send(body);
    } else {
      res.statusCode = 404;
      res.send('');
    }
  });
});

// Proxy for GET /api/lol/:region/v1.4/summoner/by-name/:summonerName
app.get('/api/lol/:region/v1.4/summoner/by-name/:summonerName', function(req, res, next) {
  var region = req.params.region;
  var summonerName = req.params.summonerName;

  var requestUrl = 'https://na.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName + '?api_key=' + riotApiKey;

  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.statusCode = 200;
      res.send(body);
    } else if (response.statusCode === 404) {
      res.statusCode = 404;
      res.send('Oops! Summoner has not been found!');
    } else {
      res.statusCode = 500;
      res.send('Awkward... An unknown error has occurred.');
    }
  });
});

// Listen
app.listen(3030, 'localhost', function() {
  console.log('HextechHunt (Server) started at http://localhost:3030');
});
