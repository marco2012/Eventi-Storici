const ws          = require('../middlewares/ws')

const Twit = require('twit');
const T = new Twit({
    consumer_key:         '2KHcOti7vj4mkmFia2aZ8MjHy',
    consumer_secret:      'CcBFhiwWQpi6xTKW8RXnTRBymcNHFQYLDbtTyvKUtDRtwA2k9e',
    access_token:         '935948964985278465-9g8X12aPSQgByuewrBxKFOMiZ6AE3rU',
    access_token_secret:  'wStoerO8EL6951GsQZ6FjW6a4jF1eskPlWWAS0peakfTF'
});

exports.tweet = function(doc, i, youtube_link, image_url, description){
    var evento = doc.events[i]
    var message_short = //messaggio per twitter piu corto
        "[" + evento.year + "] " +              //anno
        evento.text + "\n" +                    //testo evento
        image_url + "\n" +                      //immagine
        "I see "+ description + ".\n\n" +       //descrizione
        youtube_link

    T.post('statuses/update', { status: message_short }, function(err, data, response) {
        if (err){
            console.log('[MIDDLEWARE][TWITTER]   Tweet troppo lungo, non posso inviarlo ('+ (message_short.length - 280) + ' caratteri di troppo)');
            ws.send('[MIDDLEWARE][TWITTER]   Tweet troppo lungo, non posso inviarlo ('+ (message_short.length - 280) + ' caratteri di troppo)');

        } else {
            console.log('[MIDDLEWARE][TWITTER]   Tweet inviato su twitter.com/dockervrun');
            ws.send('[MIDDLEWARE][TWITTER]   Tweet inviato sul <a target="_blank" href="http://twitter.com/dockervrun">profilo Twitter</a>');
        }
    })
}
