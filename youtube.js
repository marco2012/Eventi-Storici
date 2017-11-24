//https://www.npmjs.com/package/youtube-node
var YouTube = require('youtube-node');
var youTube = new YouTube();
var YOUTUBE_KEY = 'AIzaSyCgBUJdvcF7Cx5jA9qSMSsxRAwvT0zimOA'
youTube.setKey(YOUTUBE_KEY);

var query = 'Docker'

youTube.search(query, 1, function(error, result) {
  if (error) console.log(error);
  else {
    var titolo = result.items[0].snippet.title
    var id = result.items[0].id.videoId
    var link = 'https://www.youtube.com/watch?v='+id
    console.log(titolo)
    console.log(link)
  }
});
