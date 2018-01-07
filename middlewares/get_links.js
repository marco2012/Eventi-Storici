//File che prende i link youtube, immagine e descrizione e li da sia a twitter che a telegram
const image_search_mw = require("../middlewares/image_search")
const microsoft_mw    = require("../middlewares/MicrosoftAI")
const youtube_mw      = require("../middlewares/youtube")
const ws              = require('../middlewares/ws')

exports.getLinks = function(doc,callback){

    var i = Math.floor(Math.random()*doc.events.length)              //indice di un evento casuale

    console.log("[MIDDLEWARE][GET_LINKS] Numero evento: " + i);
    ws.send("[MIDDLEWARE][GET_LINKS] Numero evento: " + i)

    var query = doc.events[i].links[0].title

    youtube_mw.searchVideo(query, function(youtube_link){                   //link video youtube
        image_search_mw.searchImage(query, function(image_url){             //link immagine
            microsoft_mw.describeImage(image_url, function(description){    //descrizione immagine
                callback(i, youtube_link, image_url, description)
            })
        })
    })
}
