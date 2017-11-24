var request = require('request');

var url = 'http://history.muffinlabs.com/date/2/14'

request.get(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    var anno = info.data.Events[0].year;
    var testo = info.data.Events[0].text;
    var html = info.data.Events[0].html;
    var links = info.data.Events[0].links;

    //prende tutti gli eventi
    for(var i = 0; i < info.data.Events.length; i++){
      console.log(info.data.Events[i]);
    }

  }
});
