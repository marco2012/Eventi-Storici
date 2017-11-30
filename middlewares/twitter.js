var Twit = require('twit');
var T = new Twit({
    consumer_key:         '2KHcOti7vj4mkmFia2aZ8MjHy',
    consumer_secret:      'CcBFhiwWQpi6xTKW8RXnTRBymcNHFQYLDbtTyvKUtDRtwA2k9e',
    access_token:         '935948964985278465-9g8X12aPSQgByuewrBxKFOMiZ6AE3rU',
    access_token_secret:  'wStoerO8EL6951GsQZ6FjW6a4jF1eskPlWWAS0peakfTF'
});

function tweet(message) {
  T.post('statuses/update', { status: message }, tweeted);
}
// Callback for when the tweet is sent
function tweeted(err, data, response) {
  if (err) console.log(err);
  else {
    console.log('Tweet inviato: ' + data.text);
  }
};

tweet('prova');
