//https://github.com/thelinmichael/spotify-web-api-node
//npm install spotify-web-api-node --save

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '99665cbb9dee4df99da15aae103f7645',
  clientSecret : '891d5d4f4e7641b89aae59ca391fe106',
  redirectUri : 'http://localhost:8888/callback'
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  // Get Elvis' albums
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    .then(function(data) {
      console.log('Artist albums', data.body);
    }, function(err) {
      console.error(err);
    });

// Search tracks whose name, album or artist contains 'Love'
spotifyApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });
