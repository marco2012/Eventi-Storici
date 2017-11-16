/*Implementare un robot via socket che vada sul sito http://www.ilmeteo.it/meteo/roma , 
prenda la temperatura minima e massima prevista per la giornata odierna, 
ed inserisca i dati prelevati su couchdb via API REST implementate con socket
*/

var net = require('net')
var getTemp = require('./getTemp');

var HOST = 'www.ilmeteo.it';
var PORT = 80;

//Assicurarsi che couchdb sia in funzione sulla porta 5984
//e che esista il database esercizioreti
var dbhost= '127.0.0.1';
var dbport=5984;
var database = 'esercizioreti'

var pagina="";

var client = new net.Socket();
var couch = new net.Socket();
//client.setEncoding(encoding='utf8');
 client.connect(PORT, HOST, function() {

    console.log('Connesso a : ' + HOST + ':' + PORT);

    // Scrive messaggio sul socket
    client.write("GET /meteo/Roma\n\n");

    // Gestori eventi
    client.on("data", function (chunk) {
        pagina += chunk;
    });

    client.on("end", function () {
        var temp = getTemp(pagina);
        console.log("Temperatura rilevata:");
        console.log(temp);
        couch.connect(dbport, dbhost, function(){
          console.log('couchdb connesso');
          var stringaTemp = JSON.stringify(temp);
          // Scrive messaggio sul socket
          couch.write('POST /' + database + '\nContent-Type: application/json\nContent-Length: ' + stringaTemp.length + '\n\n' + stringaTemp + '\n\n');
          // Gestore evento
          couch.on("data", function (data) {
              console.log(data.toString());
          });
        });
    });
});
