//Pacchetto che gestisce i metodi http in maiera più veloce
var request = require("request")

//Indirizzo in localhost di couchdb 
var url = "http://127.0.0.1:5984"

// Con questo metodo si può salvare un documento all'interno di un database(che io in questo caso ho gia inserito dentro la url, ma
// si puo inserire tramite un passaggio di parametro).
// Con la POST couchdb genera il documento attribuendogli un uuid univoco all'interno del databse e ho letto che sarebbe meglio
// lasciarglielo fare.
// Ovviamente il corpo deve essere in formato JSON, in questo caso inserisco nel database prova il documeto con id = uuid che ha campo
// message : Hello World
exports.save = function() {
    request.post({
        url: url + '/' + "prova",
        headers: {"Content-Type":"application/json"},
        body: {message: "Hello World"},
        json: true,
    })
}
