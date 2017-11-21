//File per la gestione di CouchDB.

var request = require("request")

//URL del database(provvisoriamente in localhost)
var db_url = "http://localhost:5984/progetto_rc/"
//URL richiesta da CouchDB per eseguire la query
var db_query = "http://localhost:5984/progetto_rc/_design/date/_view/getByDate"


//Metodo che attraverso POST http inserisce i documenti all'interno del database.
//In caso di successo nell'insermineto restituisce callback(null), altrimenti restituisce callback(err) dove
//err indica la natura dell'errore.
exports.save(doc, callback) {
    request.post({
        url: db_url,
        body: doc,
        json: true
    }, function(err, res, body) {
        if (err) {
            console.log("Errore durante l'inserimento di un documento nel database")
            callback(err)
        }
        else {
            console.log("Documento correttamente inserito nel database")
            callback(null)
        }
    })
}


//Metodo che preso in input una stringa indicante la data da ricercare in formato "<Month> <Day>" esegue una ricerca
//del relativo record all'interno del database attraverso una GET http.
//In caso di successo nella ricerca restituisce callback(null, doc), altrimenti restituisce callback(err, doc) dove
//err indica la natura dell'errore.
exports.fetch(date, callback) {
    var query_string = "?key=%22" + date.replace(/ /g, "+") + "%22"
    request.get({
        url: db_query + query_string
    }, function(err, res, body) {
        if (err) {
            console.log("Documento non presente all'interno del database")
            callback(err, null)
        }
        else {
            console.log("Documento trovato nel database")
            callback(null, body.value)
        }
    })
}

