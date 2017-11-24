//https://developers.google.com/youtube/v3/code_samples/javascript#search-by-keyword
//https://www.npmjs.com/package/youtube-node
var request = require('request');
var YouTube = require('youtube-node');

var youTube = new YouTube();
var YOUTUBE_KEY = 'AIzaSyCgBUJdvcF7Cx5jA9qSMSsxRAwvT0zimOA'
youTube.setKey(YOUTUBE_KEY);

var query = 'Docker'
youTube.search(query, 2, function(error, result) {
  if (error) console.log(error);
  else {
    var body = JSON.stringify(result, null, 2)
    var link = body.match(/"videoId": "(/\w)"/gi)
    console.log(link)
  }
});
