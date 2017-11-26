var request = require('request');

var options = {
  url: 'http://history.muffinlabs.com/date/2/14'
}

request.get(options, function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body); //Gli passo tutto il documento

    //info.data.Events.length = Calcola la lunghezza..
    //.. delle righe contenute in Events
    for(var i = 0; i < info.data.Events.length; i++){

      console.log("######################");
      //Ritorno year
      var anno = info.data.Events[i].year;
      console.log(info.data.Events[i].year);

      console.log("######################");
      //Ritorno il text
      var testo = info.data.Events[i].text;
      console.log(info.data.Events[i].text);

      console.log("######################");
      //Ritorno l'html
      var cod = info.data.Events[i].html;
      console.log(info.data.Events[i].html);

      console.log("######################");
      //Ritorno i links:
      //links contiene: -title, -link
      //In questo caso prendo sia title che link
      var coll = info.data.Events[i].links;
      console.log(info.data.Events[i].links);


      //Nel caso li volessi singolarmente:
      for(var kk = 0; kk < info.data.Events[i].links.length; kk++){
        console.log("######################");
        console.log(info.data.Events[i].links[kk].title);
        console.log(info.data.Events[i].links[kk].link);
        //Se decidiamo di voler prendere solo il primo personaggio..
        //.. basta sostituire [0] nell'array "links"
    }

    //Se voglio cercare il PRIMO TITLE di ogni anno SU YouTube
    console.log("######################");
    console.log("Cerco su Youtube: " + info.data.Events[i].links[0].title);

  }
}
});
