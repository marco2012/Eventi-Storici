//Pacchetto che gestisce i metodi http
var request = require("request")

//Indirizzo in localhost di couchdb
var url = "http://127.0.0.1:5984"

//Meotodo che fa una post su couchdb, con la post una volta specificato il nome del databse nella url(che nel mio caso
// è "prova") si aggiunge un documento co uuid univoco dentro couchdb, che è la soluzione migliore per quanto ho letto.
// Il messaggio è chiaramente formattato in json.
exports.save = function() {
    request.post({
        url: url + '/' + "prova",
        headers: {"Content-Type":"application/json"},
        body: {message: "Hola World"},
        json: true,
    })
}
