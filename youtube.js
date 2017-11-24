//https://developers.google.com/youtube/v3/code_samples/javascript#search-by-keyword

var YouTube = require('youtube-node');
var youTube = new YouTube();
var YOUTUBE_KEY = 'AIzaSyCgBUJdvcF7Cx5jA9qSMSsxRAwvT0zimOA'
var query = 'Docker'

youTube.setKey(YOUTUBE_KEY);

youTube.search(query, 2, function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
  }
});
