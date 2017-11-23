var request = require('request');

var options = {
  url: 'http://history.muffinlabs.com/date/2/14'
}

request.get(options, function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);

    var anno = info.data.Events[0].year;
    var testo = info.data.Events[0].text;
    var cod = info.data.Events[0].html;
    var coll = info.data.Events[0].links;

    for(var i = 0; i < info.data.Events.length; i++){
      console.log(info.data.Events[i]);
    }
    /*console.log("###############################");
    //console.log(anno);
    console.log("###############################");
    //console.log(testo);
    console.log("###############################");
    //console.log(cod);
    console.log("###############################");
    //console.log(coll);
    console.log("###############################");
    console.log();
    console.log("###############################");
  }
  */
  }
});
