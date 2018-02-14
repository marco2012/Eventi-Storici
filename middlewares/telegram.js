//https://stackoverflow.com/a/33128465
//https://unnikked.ga/getting-started-with-telegram-bots-9e467d922d69
//https://stackoverflow.com/a/44733953  //parse_mode
const request     = require("request")
const ws          = require('../middlewares/ws')

const token       = '';
const channelID   = "@eventi_storici"

exports.telegram = function(doc, i, youtube_link, image_url, description){
    var evento = doc.events[i]
    var query = evento.links[0].title

    //esempio di messaggio: 70 years ago on June 25 1948 - The Berlin airlift begins. <link youtube> <immagine>
    var message =
        "<i>" + (2018-parseInt(evento.year)) + " years ago on " + doc.date + " " + evento.year + "</i> \n" +      //data
        "<b>" + evento.text + "</b> \n\n"  +                                                                      //testo
         evento.links[0].link + "\n\n" +                                                                           //wikipedia
         youtube_link                                                                                              //youtube

    //invio messaggio https://core.telegram.org/bots/api#sendmessage
    request.get("https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+channelID+"&text="+message+"&parse_mode=html", function (error, response, body){
        if (error) console.log(error)
        console.log('[MIDDLEWARE][TELEGRAM]  Messaggio telegram inviato');
        ws.send('[MIDDLEWARE][TELEGRAM]  Messaggio inviato sul <a target="_blank" href="http://t.me/behdaicapolavoro">canale Telegram</a>');
    })

    //invio immagine https://core.telegram.org/bots/api#sendphoto
    var caption =
        "Here's an image about " + query + ".\n\n" +                                                                            //immagine
        "I see "+ description                                                                                                   //descrizione

    request.get("https://api.telegram.org/bot"+token+"/sendPhoto?chat_id="+channelID+"&photo="+image_url+"&caption="+caption, function (error, response, body){
        if (error) console.log(error)
        console.log('[MIDDLEWARE][TELEGRAM]  Immagine telegram inviata');
        ws.send('[MIDDLEWARE][TELEGRAM]  Immagine telegram inviata');
    })
}
