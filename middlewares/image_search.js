//Cerca l'immagine su internet e restuituisce il link
const request = require('request');
const ws      = require('../middlewares/ws')

exports.searchImage = function(query, callback){
    var options = {
        url : 'https://api.qwant.com/api/search/images?count=1&device=desktop&extensionDisabled=true&safesearch=1&locale=en_EN&q='+query+'&t=web' ,
        headers : {
            'Content-Type': 'application/json',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'
        },
        json: true
    }
    request.get(options, function (error, response, body) {
        if (error) console.log(error);
        else {
            var image_url = ''
            if (body.data.result.items.length > 0){ //c'e' almeno 1 risultato
                image_url = body.data.result.items[0].media
                console.log("[MIDDLEWARE][IMAGE]     URL immagine trovata: " + image_url)
                ws.send('[MIDDLEWARE][IMAGE] <a target="_blank" href="'+image_url+'">URL immagine trovata</a>')
            } else {
                console.log("[MIDDLEWARE][IMAGE]     Url immagine NON trovata")
                ws.send("[MIDDLEWARE][IMAGE]     Url immagine NON trovata")
            }
            callback(image_url)
        }
    });
}
