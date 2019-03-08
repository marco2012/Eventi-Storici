//https://www.npmjs.com/package/youtube-node
var ws          = require('../middlewares/ws')
var YouTube     = require('youtube-node');
var youTube     = new YouTube();
var YOUTUBE_KEY = ''
youTube.setKey(YOUTUBE_KEY);

exports.searchVideo = function(query, callback){
    youTube.search(query, 1, function (error, result) { //cerco su youtube il titolo del primo link
        if (error) {
            console.log(error);
        } else {
            var youtube_link
            if (result.items.length > 0) { //c'e' almeno 1 risultato
                var id = result.items[0].id.videoId
                if (id) {
                    youtube_link = 'https://www.youtube.com/watch?v='+id
                    console.log("[MIDDLEWARE][YOUTUBE]   Video su youtube trovato: "+youtube_link);
                    ws.send('[MIDDLEWARE][YOUTUBE]   <a target="_blank" href="'+youtube_link+'">Video su youtube trovato</a>')
                }
                else {
                    youtube_link = ''
                    console.log("[MIDDLEWARE][YOUTUBE]   Video su youtube NON trovato");
                    ws.send("[MIDDLEWARE][YOUTUBE]   Video su youtube NON trovato")
                }
            } else {
                console.log("[MIDDLEWARE][YOUTUBE]   Video su youtube NON trovato");
                ws.send("[MIDDLEWARE][YOUTUBE]   Video su youtube NON trovato")
            }
            callback(youtube_link)
        }
    })
}
